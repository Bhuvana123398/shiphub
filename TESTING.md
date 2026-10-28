# ShipHub API Testing

**Base URL:** `http://localhost:3000`

## Test 1: Order Filtering — Matching Status

**Request:**
```bash
curl -i "http://localhost:3000/orders?status=SHIPPED"
```
**Output:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:06:18 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
{"success":true,"count":2,"data":[{"id":"ORD-101","customer":"Alice","product":"Laptop","status":"SHIPPED"},{"id":"ORD-104","customer":"David","product":"Keyboard","status":"SHIPPED"}]}
```
**Result:** Passed. Two orders with status `SHIPPED were returned.

## Test 2: Order Filtering — No Matching Status

**Request:**
```bash
curl -i "http://localhost:3000/orders?status=UNKNOWN"
```

**Output:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:06:26 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
{"success":true,"count":0,"data":[]}
```
**Result:** Passed. The response returned `200 OK`, with `count: 0` and an empty array.

## Test 3: Single-Order Lookup — Existing Order

**Request:**
```bash
curl -i http://localhost:3000/orders/ORD-101
```

**Output:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:06:37 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":true,"data":{"id":"ORD-101","customer":"Alice","product":"Laptop","status":"SHIPPED"}}
```

**Result:** Passed. The requested order was returned successfully.

## Test 4: Single-Order Lookup — Missing Order

**Request:**
```bash
curl -i http://localhost:3000/orders/ORD-999
```

**Output:**
```http
HTTP/1.1 404 Not Found
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:07:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":false,"message":"Order not found","id":"ORD-999"}
```

**Result:** Passed. The response returned `404 Not Found` and included the requested order ID.

## Test 5: Health Check

**Request:**
```bash
curl -i http://localhost:3000/health
```

**Output:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:07:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":true,"message":"ShipHub server is running"}
```

**Result:** Passed. The server health endpoint responded successfully.

## Test 6: Unknown Route

**Request:**
```bash
curl -i http://localhost:3000/unknown
```

**Output:**
```http
HTTP/1.1 404 Not Found
Content-Type: application/json
Date: Tue, 27 Oct 2026 17:07:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"success":false,"message":"Route not found"}
```

**Result:** Passed. The unknown route returned `404 Not Found` with a JSON error response.

## Overall Summary

All six API tests returned the expected HTTP status codes and JSON responses. The filtering endpoint returns  `200 OK` with an empty array when no orders match, while the single-order lookup returns `404 Not Found` when the requested order does not exist. All tested responses include `Content-Type: application/json`.