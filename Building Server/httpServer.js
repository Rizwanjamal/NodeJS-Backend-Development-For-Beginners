const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.write('Hello World !');
        res.end();
    }
    else if (req.url == '/books') {
        res.write(JSON.stringify([
            {name : 'A Smarter Way To Learn Javascript'}, 
            {name: 'A Smarter Way To Learn HTML'}]));
        res.end();
    }
});

const port = 3000;
server.listen(port);

console.log(`Server running at port ${port}`);

