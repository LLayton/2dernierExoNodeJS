// A BASIC Node server
// Routing Requests

const http = require("http");
const url = require("url");
const port=parseInt(process.argv[2]);

const server = http.createServer(function(req, res) {
  let val="";
  if (req.method == 'GET') {
      //console.log(req.url);
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  // parsedURL.pathname  parsedURL.query
  // standardize the requested url by removing any '/' at the start or end
  // '/folder/to/file/' becomes 'folder/to/file'
  path = path.replace(/^\/+|\/+$/g, "");
  console.log(path);
  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();

  req.on("data", function() {
    console.log("got some data");
    //if no data is passed we don't see this messagee
    //but we still need the handler so the "end" function works.
  });
  req.on("end", function() {
    //request part is finished... we can send a response now
    console.log("send a response");
    //we will use the standardized version of the path
    let route =
      typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    let data = {
      path: path,
      queryString: qs,
      headers: headers,
      method: method
    };
    //pass data incase we need info about the request
    //pass the response object because router is outside our scope
    route(data, res);
  });
    req.pipe(map(function (chunk) {
      val=chunk
    })).pipe(res)
  
} else {
    return res.end('There is no post method')
}


});

server.listen(port, function() {
  console.log("Listening on port "+port);
});

//define functions for the different Routes
//This object and the functions could be defined in another file that we import
//Each route has a function that takes two parameters
//data: the info about the request
//callback: the function to call to send the response
let routes = {
  "api/parsetime": function(data, res) {
    let date=Date.parse(val)
    let payload = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      hours: getHours()
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write(payloadStr);
    res.end("\n");
  },
  "api/unixtime":function(data,res){
    let date=Date.parse(val)
    let payload = date
  }
};