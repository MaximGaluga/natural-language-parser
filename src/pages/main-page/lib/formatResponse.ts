function formatResponse(res: Object): string {
	return JSON.stringify(res, null, 2)
						.replace(/[{}]/g, '')
						.replace(/[\[\]]/g, '')
						.replace(/,/g, '');
}

export { formatResponse }