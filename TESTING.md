# ShipHub API Testing Evidence
Base URL: `http://localhost:3000`
## Test 1: Filter hit

**Command**
```bash
curl -i "http://localhost:3000/orders?status=SHIPPED"
```
**Actual output**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:06:18 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":true,"count":2,"data":[{"id":"ORD-101","customer":"Alice","product":"Laptop","status":"SHIPPED"},{"id":"ORD-104","customer":"David","product":"Keyboard","status":"SHIPPED"}]}
```

## Test 2: Filter miss

**Command**
```bash
curl -i "http://localhost:3000/orders?status=UNKNOWN"
```

**Actual output**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:06:26 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":true,"count":0,"data":[]}
```

## Test 3: Existing order

**Command**
```bash
curl -i http://localhost:3000/orders/ORD-101
```

**Actual output**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:06:37 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":true,"data":{"id":"ORD-101","customer":"Alice","product":"Laptop","status":"SHIPPED"}}
```

## Test 4: Missing order

**Command**
```bash
curl -i http://localhost:3000/orders/ORD-999
```

**Actual output**
```http
HTTP/1.1 404 Not Found
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:07:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":false,"message":"Order not found","id":"ORD-999"}
```

## Test 5: Health check

**Command**
```bash
curl -i http://localhost:3000/health
```

**Actual output**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:07:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":true,"message":"ShipHub server is running"}
```

## Test 6: Unknown route

**Command**
```bash
curl -i http://localhost:3000/unknown
```

**Actual output**
```http
HTTP/1.1 404 Not Found
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:07:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":false,"message":"Route not found"}
```

## Test Summary

All six requests returned the expected HTTP status codes. Every response used `Content-Type: application/json`. The filter miss returned `200 OK` with an empty array, while the missing-order lookup returned `404 Not Found` and included the requested order ID.