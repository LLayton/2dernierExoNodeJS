const http = require('http')
const map = require('through2-map')
const port=parseInt(process.argv[2]);
const server = http.createServer(function (req, res) {
  if (req.method == 'POST') {
      req.pipe(map(function (chunk) {
          let chaineAretourner=chunk.toString().toUpperCase()
        return chaineAretourner
      })).pipe(res)
    
  } else {
      return res.end('There is no post method')
  }

 
})

server.listen(port)