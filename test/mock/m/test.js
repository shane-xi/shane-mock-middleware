module.exports = (req, res) => {
	let test = 1
	if (req.$config.user === 'Activating') {
		test = 2
	}
	return {
		test: test
	}
}