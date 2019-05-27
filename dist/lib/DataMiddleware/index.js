"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class DataMiddleware {
    constructor(root) {
        this.$root = root;
    }
    handle(req, res, next) {
        const mockFilePath = path.join(this.$root, req.path);
        const mockFile = require(mockFilePath);
        if (typeof mockFile === 'function') {
            res.json(mockFile(req, res, next));
            return;
        }
        next();
    }
}
exports.default = DataMiddleware;
//# sourceMappingURL=index.js.map