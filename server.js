'use strict';

var currency = {
    USD: { data: [1, 3060, 3.34, 0.99, 3.6, 0.68, 110.280, 0.89], aval: Math.random() >= 0.5},
    COP: { data: [0.003, 1, 0.0001, 0.00032, 0.0012, 0.00022, 0.036, 0.00029], aval: Math.random() >= 0.5},
    PEN: { data: [0.299, 912.56, 1, 0.297, 1.081, 0.204, 33.01, 0.269], aval: Math.random() >= 0.5},
    CHF: { data: [1.0052, 3083.52, 3.366, 1, 3.633, 0.687, 110.805, 0.904], aval: Math.random() >= 0.5},
    BRL: { data: [0.277, 848.81, 0.927, 0.275, 1, 0.189, 30.50, 0.249], aval: Math.random() >= 0.5},
    GBP: { data: [1.462, 4485.27, 4.897, 1.454, 5.284, 1, 161.177, 1.315], aval: Math.random() >= 0.5},
    YEN: { data: [0.00906, 27.643, 0.0302, 0.00901, 0.032, 0.00620, 1, 0.0081], aval: Math.random() >= 0.5},
    EUR: { data: [1.112, 3409.66, 3.723, 1.106, 4.017, 0.76, 122.525, 1], aval: Math.random() >= 0.5}
};
const position = {
    USD: 0,
    COP: 1,
    PEN: 2,
    CHF: 3,
    BRL: 4,
    GBP: 5,
    YEN: 6,
    EUR: 7
};

console.log(currency);

// ------ server ---------
var net = require('net');

var server = net.createServer(function(socket) {
    socket.on('data', function (data) {
        data = JSON.parse(data);
        if (currency[data[0]].aval) {
            var pos = position[data[1]];
            var value = currency[data[0]].data[pos];
            socket.write(value.toString());
        }
        else
            socket.write('false');
    });
});

server.on('error', function (err) {
    throw err;
});

server.listen(1337, '127.0.0.1');