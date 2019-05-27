"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigMiddleware_1 = require("./lib/ConfigMiddleware");
const DataMiddleware_1 = require("./lib/DataMiddleware");
const path = require("path");
class Mock {
    constructor(root) {
        root = this.$root = root || path.join(process.cwd(), 'mock');
        this.configMiddleware = new ConfigMiddleware_1.default(root);
        this.dataMiddleware = new DataMiddleware_1.default(root);
    }
    handler(req, res, next) {
        this.configMiddleware.handle(req, res, () => {
            this.dataMiddleware.handle(req, res, next);
        });
    }
}
module.exports = function (root) {
    let mock = new Mock(root);
    return function (req, res, next) {
        mock.handler(req, res, next);
    };
};
//# sourceMappingURL=index.js.map