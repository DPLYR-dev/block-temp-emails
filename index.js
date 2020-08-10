const express = require('express')
const cors = require('cors')
const fs = require('fs')
const readline = require('readline');
var app = express();
var PORT = process.env.PORT || 3001;
app.use(cors())

var domains = []

const readInterface = readline.createInterface({
  input: fs.createReadStream('./domains.txt'),
  output: process.stdout,
  console: false
});

readInterface.on('line', function (line) {
  // console.log(line);
  domains.push(line)
});

console.log(domains.toString())

app.get("/:email", function (req, res) {
  var email = req.params.email;
  var emaild = email.toString().split("@")
  if (emaild.length == 0) {
    return res.json({ "message": "envalid email" })
  }
  if (domains.includes(emaild[1])) {
    return res.json({ "message": "temp email" })

  }
  return res.json({ "message": "valid email" })

})
app.get("/", function (req, res) { 
  res.send("<body>Welcome to temp email detector. If you are suffering from users with themp emails then you came to the right place <br> Just send a GET request to /email and it will return the status of the email whether it's or invalid email</body>")
 })
app.listen(PORT, () => console.log("Server Running on Port: " + PORT));