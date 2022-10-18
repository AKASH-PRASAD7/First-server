const express = require("express");

//Intialization
const app = express();

//app will use JSON for data transfer

app.use(express.json());

const port = 8081;

const list = ["Apple", "Samsung", "Nokia"];

app.listen(port, () => {
  //callback function
  console.log(`Server Started at port ${port}`);
});

app.get("/todo", (req, res) => {
  //callback function
  res.status(200).send(list);
});

app.post("/todo", (req, res) => {
  list.push(req.body.item);
  res.status(201).send({
    msg: "Item added Succesfully",
  });
});

app.delete("/todo", (req, res) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === req.body.item) {
      list.splice(i, 1);
      res.status(202).send({
        msg: `Deleted ${req.body.item}`,
      });
      break;
    }
  }
  res.status(404).send({
    msg: "Item not Found",
  });
});

//for rest of requests/methods
app.all("/todo", (req, res) => {
  res.status(501).res.send();
});

//for rest of routes
app.all("*", (req, res) => {
  res.status(404).send();
});
