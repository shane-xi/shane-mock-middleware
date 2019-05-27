"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class ConfigMiddleware {
    constructor(root) {
        this.$root = root;
        this.$configFilePath = path.join(this.$root, 'config');
        this.$config = {};
    }
    get() {
        let config;
        try {
            config = require(this.$configFilePath);
        }
        catch (e) {
            config = {};
        }
        Object.keys(config).forEach(key => {
            config[key].value = this.$config[key] || 'Normal';
        });
        return config;
    }
    set(req) {
        this.$config[req.body.key] = req.body.value;
        req.$config = this.$config;
    }
    handle(req, res, next) {
        if (req.path.startsWith('/mock-config/')) {
            const fileName = req.path.substr('/mock-config/'.length);
            res.sendFile(path.join(__dirname, '../../../assets/' + (fileName || 'index.html')));
            return;
        }
        if (req.path === '/mock-config') {
            if (req.method === 'GET') {
                res.json(this.get());
                return;
            }
            else if (req.method === 'POST') {
                this.set(req);
                res.json(this.get());
                return;
            }
            else {
                res.status = 405;
                res.send('405 Method Not Allowed');
                return;
            }
            return;
        }
        req.$config = this.$config;
        next();
    }
}
exports.default = ConfigMiddleware;
//# sourceMappingURL=index.js.map