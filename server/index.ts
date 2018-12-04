import express from 'express'
import {Router, Request, Response} from 'express'
import * as path from 'path'
import * as WebSocket from 'ws'
import * as http from 'http'

const router: Router = Router()
let currentConnection: WebSocket

router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../public/a.html'))
})

router.get('/force-refresh', (req: Request, res: Response) => {
  if (currentConnection) {
    currentConnection.send('refresh')
  }
  res.json({success: 'ok'})
})

const app: express.Application = express()
const port: number = 3000
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

wss.on('connection', (ws: WebSocket) => {
  currentConnection = ws
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
