enum FILE_FORMAT {
	TXT = 'txt',
	PDF = 'pdf',
	DOCX = 'docx',
}

type FileConfig = {
	fileName: string,
	fileFormat: FILE_FORMAT
}

export type { FileConfig }
export { FILE_FORMAT }