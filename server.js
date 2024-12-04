const app = require("./app");
const connectDatabase = require("./config/databaseConfig");
const dotenv = require("dotenv");
const http = require("http");
const WebSocket = require("ws");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Error", err.stack);
  console.log("Uncaught Exception. Shutting down...");
  process.exit(1);
});

// Setting Config File
dotenv.config({ path: "config/config.env" });

// Connecting to database
connectDatabase();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket event handling
wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.on("message", (message) => {
    console.log("Received message:", message);
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Broadcast utility function
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Attach the broadcast function to app.locals
app.locals.broadcast = broadcast;

// Start the server
server.listen(process.env.PORT, () => {
  console.log(
    `Server is working on ` +
      process.env.LOCALHOST_URL +
      process.env.PORT +
      ` in ` +
      process.env.NODE_ENV +
      ` mode.`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("Error:", err.message);
  console.log("Unhandled promise rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
