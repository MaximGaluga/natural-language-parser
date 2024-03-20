function fetchReadMe() {
	const link = document.createElement("a");
	link.href = 'README.txt';
	link.download = 'README.txt';
	link.click();
	link.remove();
}

export { fetchReadMe }