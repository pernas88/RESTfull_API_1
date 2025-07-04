const http = require('http');

const PORT = 3000;

const server = http.createServer( (req, res) => { 

    res.setHeader("Content-Type", "text/html; chartset=utf-8");
    res.end("<h1> Hola mundo </h1>");
});

server.listen(PORT, () =>{
    console.log(`Server running at http:localhost:${PORT}`)
});