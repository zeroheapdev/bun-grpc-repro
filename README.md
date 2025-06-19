## Minimal Repro

```bash
git clone https://github.com/zeroheapdev/bun-grpc-repro.git
cd bun-grpc-repro
npm install
```

Start the gRPC server:

```bash
npm run start:server
```

Run the client:

```bash
npm run start:client:node    # success
npm run start:client:bun     # hangs
```

---

## Structure

```
client.js       # gRPC client using @grpc/grpc-js
server.js       # Basic gRPC echo server
test.proto      # Proto definition
package.json    # All dependencies listed
```

---

## Environment

* Bun: v1.2.8 / v1.2.16 (tested both)
* Node.js: v22.14.0
* OS: Windows 10 Pro 22H2 (Build 19045)

---

## Output

**Node**

```bash
> npm run start:client:node
Attempt #1: Sending request...
Response: Echo: ping
```

**Bun**

```bash
> npm run start:client:bun
Attempt #1: Sending request...
(no response, no error — hangs forever)
```

---

## Expected

Bun should handle a basic gRPC client request just like Node.

---

## Actual

Request hangs without error. Works immediately under Node.
