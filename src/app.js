import e from "express";
import bodyParser from "body-parser";
const app = e();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

import productRoute from "./routes/products.js";
import authentication from "./routes/authentication.js";
import orders from "./routes/orders.js";

app.use(orders);
app.use(authentication);

app.use(productRoute);
app.listen(8080);
