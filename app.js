const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {
    //get url and parse
    let parseUrl = url.parse(req.url, true)
    //get the path
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    // console.log(trimPath);
    // res.end()
    req.on('data', (data) => {

    })
    req.on('end', () => {
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handler.notFound;
        let data = {"trimPath": trimPath};
        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object'? payload : {};
            let payloadString = JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log("status "+ statusCode + "payload" + payload);
        })
    })
})

server.listen(3000, 'localhost', () => console.log('Sever is running at http://localhost:3000'));

//definer the handler
const handler = {};
handler.sample = function (data, callback) {
    callback(406, {'name':'sample handler'});
}
handler.notFound = function (data, callback) {
    callback(404);
}

handler.home = function (data, callback) {
    callback(200, 'home page');
}

//definer the request router

const router = {
    'sample': handler.sample,
    'home': handler.home,
}


