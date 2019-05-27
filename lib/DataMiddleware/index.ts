import * as path from 'path'
export default class DataMiddleware {
	private $root
	constructor(root?: string) {
		this.$root = root
	}
	handle(req, res, next) {
		const mockFilePath = path.join(this.$root, req.path)
		const mockFile = require(mockFilePath)
		if ( typeof mockFile === 'function') {
			res.json(mockFile(req, res, next))
			return
		}
		next()
	}
}