
import { createServer } from "node:http";
import { orders } from "./data/orders.js";

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const url = new URL(req.url, "http://localhost:3000");
  const pathname = url.pathname;

  if (req.method === "GET" && pathname === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: "ShipHub server is running"
    }));
    return;
  }

  if (req.method === "GET" && pathname === "/orders") {
    const status = url.searchParams.get("status");
    const filteredOrders = status? orders.filter(order => order.status === status): orders;
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      count: filteredOrders.length,
      data: filteredOrders
    }));
    return;
  }
  
  if (req.method === "GET" && pathname.startsWith("/orders/")) {
    const orderId = decodeURIComponent(
      pathname.slice("/orders/".length)
    );

    const order = orders.find(item => item.id === orderId);

    if (!order) {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        message: "Order not found",
        id: orderId
      }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: order
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
