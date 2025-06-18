const grpcPkg = await import('@grpc/grpc-js');
const loaderPkg = await import('@grpc/proto-loader');
const grpc = grpcPkg.default;
const protoLoader = loaderPkg.default;
const packageDef = protoLoader.loadSync('test.proto');
const proto = grpc.loadPackageDefinition(packageDef);
const client = new proto.TestService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);
function callGrpc(attempt = 1) {
  console.log(`\n Attempt #${attempt}: Sending request...`);
  client.TestMethod({ message: 'ping' }, (err, response) => {
    if (err) {
      console.error(`Attempt #${attempt} failed:`, err.code, err.message);
      if (attempt < 2) {
        setTimeout(() => callGrpc(attempt + 1), 1000);
      } else {
        console.error('Final failure');
      }
    } else {
      console.log('Response:', response.result);
    }
  });
}
callGrpc();