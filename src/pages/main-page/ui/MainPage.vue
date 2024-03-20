<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { ImportFile } from '@/features/import-file'
import { ExportFile } from '@/features/export-file'
import { FileType } from 'ant-design-vue/es/upload/interface'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { FileConfig, FILE_FORMAT } from '@/shared/model'
import { url } from '@/shared/api'
import { formatResponse, fetchReadMe } from '../lib'
import { filters, FILTER_TYPE } from '../model'

const isLoading = ref(false);

const parsedText = ref<string>('');
let previousParsedText: string | null = null;
let textDto: string | null = null;
const search = ref<string>('');
const filter = ref<FILTER_TYPE>(FILTER_TYPE.NONE);
const fileConfig = ref<FileConfig>({ fileName: 'sample', fileFormat: FILE_FORMAT.TXT });

function handleUploadedFile(file: FileType) {
	const [ fileName, fileFormat ] = file.name.split('.');
	fileConfig.value.fileName = fileName;

	const formData = new FormData();
	formData.append('file', file);

	switch(fileFormat) {
		case FILE_FORMAT.TXT:
			const txtUrl = url + '/nlp/upload-txt';
			parseFile(txtUrl, formData);
			break;
		case FILE_FORMAT.DOCX:
			const docxUrl = url + '/nlp/upload-docx';
			parseFile(docxUrl, formData);
			break;
	}
}

function parseFile(url: string, formData: FormData) {
	isLoading.value = true;
	axios.post(url, formData)
		.then((res) => {
			isLoading.value = false;
			message.success('File was parsed successfully');
			textDto = JSON.stringify(res.data);
			parsedText.value = formatResponse(res.data.words);
			previousParsedText = parsedText.value;
		})
		.catch((err) => {
			isLoading.value = false;

			message.error('Network error');
			console.error(err);
			message.error('Check out README file');
			setTimeout(fetchReadMe, 1000);
		});
}

function onSearch(query: string) {
	const isQueryExists = () => {
		const charArray = query.replace(/[\s]/g, '');
		return (charArray.length > 0);
	}

	if (isQueryExists() && textDto) {
		isLoading.value = true;

		const searchData = Object.assign({filtered_substr: query}, JSON.parse(textDto));
	
		axios.post(url + '/nlp/filter-data', searchData)
			.then((res) => {
				isLoading.value = false;
				parsedText.value = formatResponse(res.data.words);
			})
			.catch((err) => {
				isLoading.value = false;
				message.error('Network error');
				console.error(err);
			});
	} else if (previousParsedText) {
		parsedText.value = previousParsedText;
	}
}

function applyFilter() {
	if (FILTER_TYPE.NONE == filter.value && previousParsedText) {
		parsedText.value = previousParsedText;
	} else if (textDto) {
		isLoading.value = true;

		const filterData = Object.assign({part_of_speech: filter.value}, JSON.parse(textDto));

		axios.post(url + '/nlp/filter-by-part-of-speach', filterData)
			.then((res) => {
				isLoading.value = false;

				const buffer = formatResponse(res.data.words);
				if (buffer) {
					parsedText.value = buffer;
				} else {
					message.error('There is no such result for the filter');
					filter.value = FILTER_TYPE.NONE;
					parsedText.value = previousParsedText ? previousParsedText: '';
				}
			})
			.catch((err) => {
				isLoading.value = false;
				message.error('Network error');
				console.error(err);
			});
	}
}
</script>

<template>
	<a-layout>
		<a-layout-header class="header" :style="{ textAlign: 'center', backgroundColor: '#c4c4c4' }">
			<a-typography-text strong>Labratory work №1</a-typography-text>
		</a-layout-header>
		<a-layout>
			<a-layout-content class="content">
				<a-space>
					<a-space direction="vertical">
						<div class="input">
							<a-textarea class="input__textarea" placeholder="The text will appear here after downloading" :rows="18" v-model:value="parsedText" />
							<a-tooltip class="input__tooltip"
								title="Delete everything here for load new file"
								destroyTooltipOnHide
								:overlayStyle="{ maxWidth: '200px' }"
								:overlayInnerStyle="{ textAlign: 'center' }" v-if="parsedText">
			
								<QuestionCircleOutlined />
							</a-tooltip>
						</div>
				
						<div class="manage-content">
							<ImportFile @fileLoaded="handleUploadedFile" v-if="!parsedText"/>
							<ExportFile :text="parsedText" :fileConfig="fileConfig" style="margin-top: 20px;" v-else />
						</div>
					</a-space>
				</a-space>
			</a-layout-content>
			<a-layout-sider class="sider-wrapper" width="500px">
				<a-space direction="vertical" style="margin-top: 100px;">
					<div class="sider-wrapper__misc">
						<a-divider>The type to export the file</a-divider>
						<a-radio-group v-model:value="fileConfig.fileFormat">
							<a-radio :value="FILE_FORMAT.TXT">TXT</a-radio>
						</a-radio-group>

						<a-divider>Filter by</a-divider>
						<a-radio-group v-model:value="filter" :options="filters" @change="applyFilter" />

						<a-divider>Search</a-divider>
						<a-input-search
							v-model:value="search"
							placeholder="Find neccessary word"
							style="width: 200px"
							@search="onSearch"
							/>
					</div>
				</a-space>
			</a-layout-sider>
		</a-layout>
		<div class="loader" v-if="isLoading">
			<a-spin size="large" tip="Loading..." />
		</div>
	</a-layout>
</template>

<style scoped lang="scss">
.content
{
	display: flex;
	justify-content: center;
	align-items: center;
}
.input
{
	position: relative;

	&__textarea {
		width: 650px;
	}

	&__tooltip {
		position: absolute;
		top: -20px;
		right: -10px;
	}
}

.manage-content
{
	width: 650px;
	height: 200px;
	text-align: center;
}

.sider-wrapper
{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;

	&__misc {
		text-align: center
	}
}

.loader
{
	position: absolute;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(89, 86, 83, 0.2);
	height: 100%;
	width: 100%;
}
</style>