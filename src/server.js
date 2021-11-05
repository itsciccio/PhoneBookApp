const { response } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());

const config_path = "../public/configs/config.ini";

app.get("/get_config", (req, res) => {
  file = fs.readFileSync(config_path, "utf8");
  res.send(file);
});

app.post("/update_config", (req, res) => {
  fs.writeFileSync(config_path, req.body.text);
  res.send({ "Config update": "Success" });
});
