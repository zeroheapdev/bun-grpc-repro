import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const packageDef = protoLoader.loadSync('test.proto');
const proto = grpc.loadPackageDefinition(packageDef);
const server = new grpc.Server();
server.addService(proto.TestService.service, {
  TestMethod: (call, callback) => {
    const message = call.request.message;
    console.log('Received:', message);
    callback(null, { result: `Echo: ${message}` });
  },
});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC Server running at http://localhost:50051');
});