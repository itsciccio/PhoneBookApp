const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/get_config", (req, res) => {
  const config_path = "../public/configs/config.ini";
  file = fs.readFileSync(config_path, "utf8");
  res.send(file);
});
