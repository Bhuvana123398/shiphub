
import { createServer } from "node:http";
import { orders } from "./data/orders.js";

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: "ShipHub server is running"
    }));
    return;
  }
  if (req.url === "/orders" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      count: orders.length,
      data: orders
    }));
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    message: "Route not found"
  }));
});

server.listen(3000, () => {
  console.log("ShipHub server running at http://localhost:3000");
});
