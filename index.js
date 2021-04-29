const http = require("http");
const settings = require("./settings.json");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

var autojindan = require('./models/autojindanDB');
var warning = require('./models/warningDB');

mongoose
  .connect("mongodb://loclhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB연결완료"))
  .catch((err) => console.log(err));

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

app.get('/api/autojindandb', function(req,res){
  autojindan.find(function(err, books){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(books);
  })
});

app.get('/api/warning', function(req,res){
  warning.find(function(err, warning){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(warning);
  })
});

app.get('/api/warning/:guild_id', function(req, res){
  warning.find({guild_id: req.params.guild_id}, function(err, warning){
      if(err) return res.status(500).json({error: err});
      if(!warning) return res.status(404).json({error: 'Not Found'});
      if(warning == '' || null || undefined || 0 || NaN){
        res.status(404).json({'error': '실패', 'info': '아무 정보를 찾지 못하였습니다'})
      } else {
      res.status(202).json({'success': '성공','info': warning});
      }
  })
});

app.get('*', function(req, res){
  res.render("NotFound", {bot: settings.website })
});


const listener = server.listen(8080, function() {
    console.log("Your app is listening on port " + listener.address().port);})
