// npm install: ws
// npm install: socks-proxy-agent
// usage: socket = CreateTorWebSocket("etc.onion", 1111)
function CreateTorWebSocket(aOnionHostname, aOnionPort) {
	// this is "Client-side", yes 
	var WebSocket = require('ws'),
		SocksProxyAgent = require('socks-proxy-agent');
	// WebSocket endpoint for the proxy to connect to
	var vEndPoint = 'ws://' + aOnionHostname + ':' + aOnionPort;
	// TOR Socks5 URI:
	var vSocks5Agent = new SocksProxyAgent("socks://127.0.0.1:9050");
	// Return WebSocket handle
	return new WebSocket(vEndPoint, { agent: vSocks5Agent });
}

var host = "aaaaaaaaaaaaaaaaaaaaaaaaaaa.onion";
var port = 1502;
var socket = CreateTorWebSocket(host, port);

socket.on('open', function () {
	console.log('"open" event!');
	socket.send('ping');
});

socket.on('message', function (data, flags) {
	console.log('received %j %j', data, flags);
	//socket.close();
});
