
/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const StaticServer = require('node-static').Server


const production = process.env.PRODUCTION != null
const port = process.env.PORT || 8082

const staticServer = new StaticServer('../', { cache: production ? 3600 : false, gzip: production })

const server = http.createServer((request, response) => {
  request.addListener('end', () => {
    staticServer.serve(request, response)
  }).resume()
})

var websocketList = [];
const wss = new WebSocket.Server({ server })


wss.on('connection', function connection(ws) {
  ws.on("message", data =>{    
    ws.send(data);
  });
  ws.on("close", () => {
    console.log("disconnected");
  })
})

server.on('upgrade', (request, socket, head) => {
  console.log("event")

})

server.listen(port)

console.log(`Listening to http://localhost:${port} ${production ? '(production)' : ''}`)
