## WebSocket on Tor?
Yes, it's possible with just few lines of code!<br>
I did not find anything on my search engine, so here it is!<br>

### Tor Configuration File (yes, it's as usual)
```c
AvoidDiskWrites 1
HiddenServiceDir EMPTY_DIR_PATH
HiddenServicePort 1502 8080
```
Yes, `EMPTY_DIR_PATH` does not need to be empty, use your old yet delicious onion!<br>
1502 is onion's port (exclusive to Tor only!)<br>
8080 is server's port (localhost!)<br>

### Server Code (example)
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

### Client Code (example)
```js
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
```
