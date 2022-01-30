const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
var path = require('path');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/admin', function(req, res) {
  res.sendFile(__dirname + "/" + "AdminLogin.html");
});

//For Admin Pannel
app.get('/admin/pannel', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/index.html");
});


app.get('/public/index_files/LineIcons.css', function(req, res) {
  res.sendFile(__dirname + "/" + "/public/index_files/LineIcons.css");
});

app.get('/public/index_files/f-shape-1.svg', function(req, res) {
  res.sendFile(__dirname + "/" + "/public/index_files/f-shape-1.svg");
});


app.get('/public/index_files/bootstrap.min.css', function(req, res) {
  res.sendFile(__dirname + "/" + "/public/index_files/bootstrap.min.css");
});


app.get('/public/index_files/default.css', function(req, res) {
  res.sendFile(__dirname + "/" + "/public/index_files/default.css");
});

app.get('/public/index_files/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "/public/index_files/style.css");
});

//Admin Pannel Functions
app.get('/admin/pannel/newTeamEntry', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/newTeamEntry/index.html");
});
app.get('/admin/pannel/newTeamEntry/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/newTeamEntry/style.css");
});

app.get('/admin/pannel/removeTeam', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/removeTeam/index.html");
});
app.get('/admin/pannel/removeTeam/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/removeTeam/style.css");
});

app.get('/admin/pannel/getGameTeams', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/getGameTeams/index.html");
});
app.get('/admin/pannel/getGameTeams/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/getGameTeams/style.css");
});

app.get('/admin/pannel/registerNewPlayer', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/registerNewPlayer/index.html");
});
app.get('/admin/pannel/registerNewPlayer/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/registerNewPlayer/style.css");
});

app.get('/admin/pannel/getAllPlayersOfTeam', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/getAllPlayersOfTeam/index.html");
});
app.get('/admin/pannel/getAllPlayersOfTeam/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/getAllPlayersOfTeam/style.css");
});

app.get('/admin/pannel/removePlayer', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/removePlayer/index.html");
});
app.get('/admin/pannel/removePlayer/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/removePlayer/style.css");
});

app.get('/admin/pannel/changeGameLocation', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/changeGameLocation/index.html");
});
app.get('/admin/pannel/changeGameLocation/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/changeGameLocation/style.css");
});

app.get('/admin/pannel/changeGameDates', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/changeGameDates/index.html");
});
app.get('/admin/pannel/changeGameDates/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/changeGameDates/style.css");
});

app.get('/admin/pannel/invalidateTicket', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/invalidateTicket/index.html");
});
app.get('/admin/pannel/invalidateTicket/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "adminPannel/invalidateTicket/style.css");
});


app.get('/tickets', function(req, res) {
  res.sendFile(__dirname + "/" + "BookTickets.html");
});

app.get('/tickets/details/*', function(req,res){
	res.sendFile(__dirname + "/" + "TicketDetails.html")
})

app.get('/upcomingtournaments', function(req, res) {
  res.sendFile(__dirname + "/" + "UpcomingTournaments.html");
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.get('/alogin.css', function(req, res) {
  res.sendFile(__dirname + "/" + "alogin.css");
});

app.get('/bt.css', function(req, res) {
  res.sendFile(__dirname + "/" + "bt.css");
});

app.get('/utstyle.css', function(req, res) {
  res.sendFile(__dirname + "/" + "utstyle.css");
});

app.get('/logo.jpg', function(req, res) {
  res.sendFile(__dirname + "/" + "logo.jpg");
});

app.get('/tickets.jpeg', function(req, res) {
  res.sendFile(__dirname + "/" + "tickets.jpeg");
});

app.get('/adminlogin.jpg', function(req, res) {
  res.sendFile(__dirname + "/" + "adminlogin.jpg");
});

app.get('/ut.jpg', function(req, res) {
  res.sendFile(__dirname + "/" + "ut.jpg");
});

app.get('/api/games', db.getGames)
app.get('/api/tickets', db.getAllTickets)
app.get('/api/ticketsType/:id', db.getGamesOnADateClass)
app.get('/api/games_detailed', db.getGamesDetailed)
app.get('/api/games/:id', db.getGameById)
app.get('/api/admin/gameTeams/:id', db.getTeamsForAGame)
app.get('/api/admin/teamPlayers/:id', db.getPlayersForATeam)
app.get('/api/admin/teamCount', db.getTeamCount)
app.get('/api/admin/playerCount', db.getPlayerCount)
app.post('/api/admin/registerPlayer', db.registerPlayer)
app.post('/api/adminlogin', db.loginAdmin)
app.post('/api/admin/registerNewteam', db.registerNewTeam)
app.put('/api/admin/changeGameDate', db.changeGameDate)
app.put('/api/admin/changeGameLocation', db.changeGameLocation)
app.delete('/api/admin/invalidateTicket', db.invalidateTicket)
app.delete('/api/admin/removeTeamP1', db.removeTeamPart1)
app.delete('/api/admin/removeTeamP2', db.removeTeamPart2)
app.delete('/api/admin/removePlayer', db.removePlayer)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})