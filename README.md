## WebSocket on TOR?
Yes, it's possible with just few lines of code!<br>
I did not find anything on my search engine, so here it is!<br>

torrc:
```c
AvoidDiskWrites 1
HiddenServiceDir EMPTY_DIR_PATH
HiddenServicePort 1502 8080
```
1502 is onion's port (exclusive to TOR only!)
8080 is server's port (localhost!)

basic web server code:
```js
var WebSocket = require('ws');
var vServer = new WebSocket.Server({
	port: 8080
});

var vWSList = [];
vServer.on('connection', function(vWS) {
	console.log("Connected!!")
	vWSList.push(vWS);
	// When you receive a message, send that message to every socket.
	vWS.on('message', function(msg) {
		console.log("Message received!!")
	});
	// When a socket closes, or disconnects, remove it from the array.
	vWS.on('close', function() {
		vWSList = vWSList.filter(s => s !== vWS);
	});
});
```
