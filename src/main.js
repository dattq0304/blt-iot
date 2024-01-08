const mosca = require('mosca');
const http = require('http');

const settings = {
    port: 1883,
};

const server = new mosca.Server(settings);

const httpServer = http.createServer();
server.attachHttpServer(httpServer);

server.on('ready', function () {
    console.log('MQTT server is running on port 1883');
});

server.on('clientConnected', function (client) {
    console.log('Client connected:', client.id);

    // setTimeout(() => {
    //     const message = {
    //         topic: 'fire',
    //         payload: 'fire',
    //         qos: 0,
    //         retain: false
    //     };
    //     server.publish(message);
    // }, 10000);
});

server.on('clientDisconnected', function (client) {
    console.log('Client disconnected:', client.id);
});

server.on('subscribed', function (topic, client) {
    console.log('Client', client.id, 'subscribed to', topic);
});

server.on('unsubscribed', function (topic, client) {
    console.log('Client', client.id, 'unsubscribed from', topic);
});

server.on('published', function (packet, client) {
    const message = packet.payload.toString();
    console.log('Received Message:', message);
});

server.on('error', function (err) {
    console.log('Error:', err);
});

httpServer.listen(3001, function () {
    console.log('WebSocket server is running on port', 3001);
});
