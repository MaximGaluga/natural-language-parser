<script setup lang="ts">
import { UploadProps } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { FileType } from 'ant-design-vue/es/upload/interface'

const emit = defineEmits<{
	(event: 'fileLoaded', payload: FileType): void
}>();

const handleFileLoading: UploadProps['beforeUpload'] = file => {
	emit('fileLoaded', file);

	return false;
};
</script>

<template>
	<a-upload-dragger accept=".txt, .docx" :showUploadList="false" :beforeUpload="handleFileLoading">
		<p class="ant-upload-drag-icon">
			<inbox-outlined />
		</p>
		<p class="ant-upload-text">
			Click or drag file to this area to import
		</p>
		<p class="ant-upload-hint">
			Supports txt and docx
		</p>
	</a-upload-dragger>
</template>

<style scoped>

</style>