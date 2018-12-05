import {renderToYaml} from '../src/renders'
import fs from 'fs'
// import a from '../examples/HelloWorld'
const m = import(process.argv[2])

m.then((c) => {
  // todo: get the path in a smarter way (maybe the 3rd parameter is absolute
  fs.writeFile(process.cwd() + '/' + (process.argv[3] || 'server/public/swagger.yaml'),
    renderToYaml(c.default),
    (err) => {
      console.error(err)
    })
})
//
