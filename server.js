const express = require('express');
const app = express();
const urllib = require('urllib')
const path = require('path');
const teamToIDs = require('./teamsDB');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/teams/:teamName', (req, res) => {
    const teamName = req.params.teamName;

    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', (err, data) => {
        const players = JSON.parse(data.toString()).league.standard
        const filteredPlayers = players.filter(p => {
            if (p.teams.length) {
                return p.teams[p.teams.length - 1].teamId == teamToIDs[teamName] && p.isActive
            } else { return false }
        })
            .map(p => {
                return {
                    firstName: `${p.firstName}`,
                    lastName: `${p.lastName}`,
                    jersey: `${p.jersey}`,
                    pos: `${p.pos}`
                }
            });
        
        res.send(filteredPlayers)
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});