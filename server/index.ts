import express from 'express'
import {Router, Request, Response} from 'express'
import * as path from 'path'
import * as WebSocket from 'ws'
import * as http from 'http'
import swaggerUi from 'swagger-ui-express'

const router: Router = Router()
let connections: WebSocket[] = []

router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../public/swagger_wrapper.html'))
})

router.get('/force-refresh', (req: Request, res: Response) => {
  connections = connections.filter((c) => {
    return c.readyState === c.OPEN
  })
  console.log(connections.length)
  connections.map((c) => {
    c.send('refresh')
  })
  res.json({success: 'ok'})
})

router.use('/sui', swaggerUi.serve)
router.get('/sui', swaggerUi.setup(null, {swaggerUrl: '/swagger.yaml'}))

const app: express.Application = express()
const port: number = 3000
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

wss.on('connection', (ws: WebSocket) => {
  connections.push(ws)
})

app.use('/', router)
app.use('/force', router)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(express.static('public'))
app.set('view engine', 'html')

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
})
