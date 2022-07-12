// npm install ws
// npm install socks-proxy-agent
// Usage: socket = CreateTorWebSocket("etc.onion", 1111)
var WebSocket2 = require('ws'),
	SocksProxyAgent = require('socks-proxy-agent').SocksProxyAgent;
function CreateTorWebSocket(aOnionHostname, aOnionPort, aScheme, aTorSocksPort) {
	// Or use 9150:
	aTorSocksPort = aTorSocksPort||9050;
	aScheme = aScheme||"ws";
	// WebSocket endpoint for the proxy to connect to
	var vEndPoint = aScheme + '://' + aOnionHostname + ':' + aOnionPort;
	// TOR Socks5 URI:
	var vSocks5Agent = new SocksProxyAgent({hostname:"127.0.0.1", port:aTorSocksPort});
	// Return WebSocket handle
	return new WebSocket2(vEndPoint, { agent: vSocks5Agent });
}
if ("undefined" !== typeof module)
	module.exports = CreateTorWebSocket;
