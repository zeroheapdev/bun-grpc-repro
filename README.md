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
* Node.js: v22.16.0
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

---

## Update

Works on grpc-js v1.12.6 : [https://github.com/oven-sh/bun/issues/20284#issue-3131587659](https://github.com/oven-sh/bun/issues/20284#issuecomment-2981481831)
```bash
npm install @grpc/grpc-js@1.12.6 @grpc/proto-loader@0.7.5
```
