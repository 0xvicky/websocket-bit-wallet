const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({port: 8181});

// Define a map to store connected clients
const clients = new Map();

// WebSocket connection handler
wss.on("connection", ws => {
  console.log("A new client connected");

  // Generate a unique client ID
  const clientId = Math.random().toString(36).substr(2, 9);

  // Store the WebSocket connection with the client ID
  clients.set(clientId, ws);

  // Send a welcome message to the client
  ws.send(JSON.stringify({type: "welcome", clientId}));

  // Message handler
  ws.on("message", message => {
    console.log("Received message from client:", message.toString());

    // Broadcast the message to all connected clients (excluding the sender)
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Close handler
  ws.on("close", () => {
    console.log("Client disconnected");
    // Remove the WebSocket connection from the map
    clients.delete(clientId);
  });

  // Error handler
  ws.on("error", error => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server is running on port 8181");
