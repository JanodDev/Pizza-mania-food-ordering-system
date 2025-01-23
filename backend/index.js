// index.js (in root directory)
const { app, server } = require("./src/app");
const config = require("./src/config/config");

const PORT = config.port || 5173;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
