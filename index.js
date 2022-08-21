const http = require("http");

const port = 8081;

http
    .createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("<h1>Created My First Server</h1>");
        response.end();
    })
    .listen(port, () => {
        console.log(`Server Started at port ${port}`);

    });

