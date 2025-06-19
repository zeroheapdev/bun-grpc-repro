Minimal Repro

git clone https://github.com/zeroheapdev/bun-grpc-repro.git
cd bun-grpc-repro
npm install

npm run start:server
npm run start:client:node    # success
npm run start:client:bun     # hangs

Structure

client.js       // gRPC client using @grpc/grpc-js
server.js       // Basic gRPC echo server
test.proto      // Proto definition
package.json    // All deps listed

Environment
Bun v1.2.8 / v1.2.16 (tested both versions)
Node v22.14.0
OS: Windows 10 Pro 22H2 (Build 19045)

Output

npm run start:client:node
> bun-grpc-repro@1.0.0 start:client:node
> node client.js
Attempt #1: Sending request...
Response: Echo: ping

npm run start:client:bun
> bun-grpc-repro@1.0.0 start:client:bun
> bun client.js
 Attempt #1: Sending request...
(no response, no error — hangs forever)

Expected  
Bun should handle a basic gRPC client request just like Node.

Actual
Request hangs without error. Works immediately under Node.
