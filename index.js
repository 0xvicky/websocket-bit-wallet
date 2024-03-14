const WebSocket = require("ws");

const server = new WebSocket.Server({port: 8181});

server.on("connection", socket => {
  console.log("Connection established🚀🚀");

  socket.on("message", message => {
    let msg = message.toString();
    if (msg === "Connection Req from Dapp") {
      //Sends notification to bitwallet app frontend to let user approve or deny the request

      let isApprove = false;
      //if request accepted, sends the crednetials
      if (isApprove) socket.send(JSON.stringify(credentials));
      //if request denied, send the message "User denied the request"
      else socket.send("User denied the request");
    }
  });
});
