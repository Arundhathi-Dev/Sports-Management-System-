const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'dbms_mini_project',
  password: 'admin',
  port: 5432,
})

const getGames = (request, response) => {
  // pool.query('SELECT g.title as "Title", pp.amount as "Prize Pool", p.prize, p.prize_level, l.name as "Location", dc.name as "Event type", dc.day1 as "Day 1", dc.day2 as "Day 3", dc.day3 as "Day 3" FROM Game g, Prize_Pool pp, Prize p, Location l, Date_Class dc WHERE g.prize=pp.id and p.prize_pool=pp.id and g.location=l.id and g.date_class=dc.id;', (error, results) => {
	pool.query('SELECT g.title as "Title", pp.amount as "Prize Pool", l.name as "Location", dc.name as "Event type", (case when dc.day1=true then \'yes\' else \'no\' end) as "Day 1", (case when dc.day2=true then \'yes\' else \'no\' end)as "Day 2", (case when dc.day3=true then \'yes\' else \'no\' end) as "Day 3" FROM Game g, Prize_Pool pp, Location l, Date_Class dc WHERE g.prize=pp.id and g.location=l.id and g.date_class=dc.id;', (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(results.rows)
	})
}

const registerNewTeam = (request, response) => {
	const {teamID, playerCount, teamName, originCountry, gameID, 
  member1FirstName, member1Tag, member1LastName, 
  member2FirstName, member2Tag, member2LastName, 
  member3FirstName, member3Tag, member3LastName, 
  member4FirstName, member4Tag, member4LastName, 
  member5FirstName, member5Tag, member5LastName} = request.body


  const team_id = parseInt(teamID)+1
  const pc = parseInt(playerCount)+1
	pool.query('INSERT INTO teams VALUES ($1, $2, $3, $4)', [team_id, teamName, originCountry, gameID], (error, results) => {
    if(error)
      throw error
  })

  pool.query('INSERT INTO players VALUES((SELECT MAX(id)+1 FROM players), $1, $2, $3, $4),((SELECT MAX(id)+2 FROM players), $5, $6, $7, $8), ((SELECT MAX(id)+3 FROM players), $9, $10, $11, $12), ((SELECT MAX(id)+4 FROM players), $13, $14, $15, $16), ((SELECT MAX(id)+5 FROM players), $17, $18, $19, $20)', [member1FirstName, member1Tag, member1LastName, team_id, member2FirstName, member2Tag, member2LastName, team_id, member3FirstName, member3Tag, member3LastName, team_id, member4FirstName, member4Tag, member4LastName, team_id, member5FirstName, member5Tag, member5LastName, team_id], (error, results) => {
    if(error)
      throw error
  })

  response.status(201).send('Done!')

}

const getTeamCount = (request, response) => {
  pool.query('SELECT MAX(id) FROM teams', (error, results) => {
    if(error)
      throw error
    response.status(200).send(results.rows[0].max.toString()) 
  })
}

const getPlayerCount = (request, response) => {
    pool.query('SELECT MAX(id) FROM players', (error, results) => {
    if(error)
      throw error
    response.status(200).send(results.rows[0].max.toString())
  })
}

const getAllTickets = (request, response) => {
  // pool.query('SELECT g.title as "Title", pp.amount as "Prize Pool", p.prize, p.prize_level, l.name as "Location", dc.name as "Event type", dc.day1 as "Day 1", dc.day2 as "Day 3", dc.day3 as "Day 3" FROM Game g, Prize_Pool pp, Prize p, Location l, Date_Class dc WHERE g.prize=pp.id and p.prize_pool=pp.id and g.location=l.id and g.date_class=dc.id;', (error, results) => {
  pool.query('SELECT tc.price, dc.name, tc.ticket_dates ,(case when dc.day1=true then \'yes\' else \'no\' end) as "FRIDAY", (case when dc.day2=true then \'yes\' else \'no\' end) as "SATURDAY", (case when dc.day3=true then \'yes\' else \'no\' end) as "SUNDAY", tc.extras FROM ticket_class tc, date_class dc WHERE tc.ticket_dates=dc.id ORDER BY tc.price DESC;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getGamesOnADateClass = (request, response) => {
  const dateClassId = parseInt(request.params.id)

  pool.query('SELECT g.title as "Title", pp.amount as "Prize Pool" FROM game g inner join prize_pool pp on pp.id = g.prize inner join date_class dc on g.date_class = dc.id, (select * from date_class where id = $1) curr where (case when curr.day1=true then curr.day1=dc.day1 else false end) or (case when curr.day2=true then curr.day2=dc.day2 else false end) or (case when curr.day3=true then curr.day3=dc.day3 else false end);', [dateClassId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const loginAdmin = (request, response) => {
  const {uid, password} = request.body	

  pool.query('SELECT password=$2 as res from admins where admin_id=$1', [uid, password], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rowCount == 1)
    	response.status(201).send(results.rows[0].res)
    else
    	response.send("User not found")
  })
}



const getGamesDetailed = (request, response) => {
  // pool.query('SELECT g.title as "Title", pp.amount as "Prize Pool", p.prize, p.prize_level, l.name as "Location", dc.name as "Event type", dc.day1 as "Day 1", dc.day2 as "Day 3", dc.day3 as "Day 3" FROM Game g, Prize_Pool pp, Prize p, Location l, Date_Class dc WHERE g.prize=pp.id and p.prize_pool=pp.id and g.location=l.id and g.date_class=dc.id;', (error, results) => {
  pool.query('SELECT g.title as "Title", pp.amount as "Prize Pool", p.prize, p.prize_level, l.name as "Location", dc.name as "Event type", (case when dc.day1=true then \'yes\' else \'no\' end) as "Day 1", (case when dc.day2=true then \'yes\' else \'no\' end)as "Day 2", (case when dc.day3=true then \'yes\' else \'no\' end) as "Day 3" FROM Game g, Prize_Pool pp, Prize p, Location l, Date_Class dc WHERE g.prize=pp.id and p.prize_pool=pp.id and g.location=l.id and g.date_class=dc.id;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const getGameById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM game WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const changeGameDate = (request, response) => {
  const {id, newDateId} = request.body

  pool.query('UPDATE game SET date_class = $2 WHERE id = $1', [id, newDateId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send("Done!")
  })
}

const changeGameLocation = (request, response) => {
  const {id, newLocationId} = request.body

  pool.query('UPDATE game SET location = $2 WHERE id = $1', [id, newLocationId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send("Done!")
  })
}

const registerPlayer = (request, response) => {
  const {firstName, tag, lastName, teamID} = request.body

  pool.query('INSERT INTO players VALUES((SELECT COUNT(*) FROM players), $1, $2, $3, $4);', [firstName, tag, lastName, teamID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send("Done!")
  })
}

const removePlayer = (request, response) => {
  const {id} = request.body

  pool.query('DELETE FROM players WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send("Done!")
  })
}

const removeTeamPart1 = (request, response) => {
  const {id} = request.body

  pool.query('DELETE FROM players WHERE team=$1', [id], (error, results) => {
    if (error) {
      throw error
      response.status(500).send(error)
    }
    else
      response.status(200).send("Done!")
  })
}


const removeTeamPart2 = (request, response) => {
  const {id} = request.body

  pool.query('DELETE FROM teams WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
      response.status(500).send(error)
    }
    else
      response.status(200).send("Done!")
  })
}

const invalidateTicket = (request, response) => {
  const {id} = request.body

  pool.query('DELETE FROM ticket WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send("Done!")
  })
}

const getTeamsForAGame = (request, response) => {

  const id = parseInt(request.params.id)

  pool.query('SELECT id, team_name FROM teams where game=$1', [id], (error, results) => {
    if(error)
      throw error
    response.status(200).json(results.rows)
  })
}

const getPlayersForATeam = (request, response) => {

  const id = parseInt(request.params.id)

  pool.query('SELECT id, first_name, tag, last_name FROM players where team=$1', [id], (error, results) => {
    if(error)
      throw error
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getGames,
  getGamesDetailed,
  getAllTickets,	
  getGamesOnADateClass,
  loginAdmin,
  registerNewTeam,
  getTeamCount,
  getPlayerCount,
  getGameById,
  changeGameDate,
  changeGameLocation,
  registerPlayer,
  removePlayer,
  getTeamsForAGame,
  getPlayersForATeam,
  removeTeamPart1,
  removeTeamPart2,
  invalidateTicket
}