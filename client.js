'use strict';

var net = require('net');

var socket = new net.Socket();
socket.connect(1337, '127.0.0.1', function() {
    console.log('Connected');

    // [from, to]
    var data = ['COP', 'USD'];
    socket.write(JSON.stringify(data));
});

socket.on('data', function(data) {
    console.log('Received: ' + data);
    socket.destroy(); // kill client after server's response
});

socket.on('close', function() {
    console.log('Connection closed');
});
