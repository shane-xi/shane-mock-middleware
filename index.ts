import ConfigMiddleware from './lib/ConfigMiddleware'
import DataMiddleware from './lib/DataMiddleware'
import * as path from 'path'
class Mock {
  public configMiddleware: ConfigMiddleware
  public dataMiddleware: DataMiddleware
  private $root: string
  constructor(root?: string) {
    root = this.$root = root || path.join(process.cwd(), 'mock')
    this.configMiddleware = new ConfigMiddleware(root)
    this.dataMiddleware = new DataMiddleware(root)
  }
  handler(req, res, next) {
    this.configMiddleware.handle(req, res, () => {
      this.dataMiddleware.handle(req, res, next)
    })
  }
}



module.exports = function (root?: string) {
  let mock = new Mock(root)
  return function(req, res, next) {
    mock.handler(req, res, next)
  }
}
