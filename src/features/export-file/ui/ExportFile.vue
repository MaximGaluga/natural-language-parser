<script setup lang="ts">
import { PropType } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { FileConfig, FILE_FORMAT } from '@/shared/model'

const props = defineProps({
	fileConfig: {
		type: Object as PropType<FileConfig>,
		required: true
	},
	text: {
		type: String as PropType<string>,
		required: true
	}
});

const loadFile = () => {
	const { fileName, fileFormat } = props.fileConfig;

	switch(props.fileConfig.fileFormat) {
		case FILE_FORMAT.TXT:
			const link = document.createElement("a");
			const file = new Blob([props.text], { type: 'text/plain' });
			link.href = URL.createObjectURL(file);

			link.download = `${fileName}.${fileFormat}`;
			link.click();
			link.remove();
			URL.revokeObjectURL(link.href);
			break;
	}
}

</script>

<template>
	<a-button type="primary" shape="round" size="large" @click="loadFile">
		<template #default>
			Download
		</template>

		<template #icon>
			<DownloadOutlined />
		</template>
	</a-button>
</template>

<style scoped>

</style>