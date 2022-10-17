const { Console } = require("console");
const http = require("http");
const { toUnicode } = require("punycode");

const port = 1234;
const arr = ["Cricket", "Football", "Badminton"];

http
  .createServer((request, response) => {
    const { method, url } = request;
    if (url === "/") {
      response.writeHead(200, { "Content-type": "text/html" });
      response.write("<h1>Go to /todo route</h1>");
    } else if (url === "/todo") {
      if (method === "GET") {
        response.writeHead(200);
        response.write(arr.toString());
      } else if (method === "POST") {
        let dataset = "";
        request
          .on("error", (err) => {
            console.error(err);
          })
          .on("data", (chunk) => {
            dataset += chunk;
            //console.log(chunk);
          })
          .on("end", () => {
            dataset = JSON.parse(dataset); //converts to JSON FOrmat
            console.log(dataset);
            const arr1 = arr;
            arr1.push(dataset.name);
            console.log(arr1);
          });
      } else if (method === "DELETE") {
        let dataset = "";
        request
          .on("error", (err) => {
            console.error(err);
          })
          .on("data", (chunk) => {
            dataset += chunk;
          })
          .on("end", () => {
            dataset = JSON.parse(dataset);

            for (let i = 0; i < arr.length; i++) {
              if (arr[i] === dataset.name) {
                arr.splice(i, 1);
                break;
              }
            }
            response.writeHead(204);
          });
      } else {
        response.writeHead(501);
      }
    } else {
      response.writeHead(404);
    }
    response.end();
  })
  .listen(port, () => {
    console.log(`Server Started at port ${port}`);
  });
