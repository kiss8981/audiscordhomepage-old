const http = require("http");
const settings = require("./settings.json");
const express = require("express");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render('index', { bot: settings.website })
})

app.get("/commands", (req, res) => {
  res.render("commands", {bot: settings.website, commands: settings.commands })
})
app.get("/donate", (req, res) => {
  res.render("donate", {bot: settings.website })
})

app.get("/privacy", (req, res) => {
  res.render("privacy", {bot: settings.website })
})

app.get("/status", (req, res) => {
  res.render("status", {bot: settings.website })
})

app.get('/sitemap.xml', function(req, res) {
  res.sendFile('C:/Users/Administrator/Downloads/Discord-Bot-Dashboard-main/Discord-Bot-Dashboard-main/views/sitemap.xml');
});


const listener = server.listen(8080, function() {
    console.log("Your app is listening on port " + listener.address().port);})
