import './NASHBoard.css'
import { useState, useEffect, createContext } from "react";

// update every week
import injuries from './Data/injuries.json';
// update when new season
import allPlayersDictRaw from './Data/active_players.json';
import allPlayersDictSportRadar from './Data/players.json';
import teamsDict from './Data/teams.json';
import currentSeasonSchedule from './Data/season_2022_schedule.json'
import remainingSeasonSchedule from './Data/season_2022_remaining_schedule.json'

import PlayerDisplay from './PlayerDisplay/PlayerDisplay';
import SearchPlayer from './SearchPlayer/SearchPlayer';
import LeagueSettings from './LeagueSettings/LeagueSettings';

// const NBA = require('nba');
// const BBRef = require('basketball-reference-js')


export const PlayerContext = createContext();

const league_scoring = {
    'points': 1,
    'rebounds': 2,
    'assists': 2,
    'steal': 2,
    'block': 1,
    'field goals missed': -1,
    'free throws missed': -1,
    'turnover': -2,
    'personal foul': -1,
    'technical foul': -2,
    'flagrant foul': -3
};

// NASHBoard = NBA All Star Hub Board
const DashBoard = () => {
    // console.log('rostered',Object.keys(allPlayersDictSportRadar))
    // filter out unrostered players
    const allPlayersDict = allPlayersDictRaw
    .filter( p => Object.keys(allPlayersDictSportRadar).includes(p['full_name']));

    // console.log('APD',allPlayersDict);
    const [matchedPlayers, setMatchedPlayers] = useState(allPlayersDict);
    const [displayedPlayer, setDisplayedPlayer] = useState({
        "id": 201566,
        "full_name": "Russell Westbrook",
        "first_name": "Russell",
        "last_name": "Westbrook",
        "is_active": true,
        "injury_status": {

        }
    });
    const [displayedGames, setDisplayedGames] = useState('');
    const [displayedTeam, setDisplayedTeam] = useState('Los Angeles Lakers');
    const [leagueScoring, setLeagueScoring] = useState(league_scoring);
    const [todaysDate, setTodaysDate] = useState('12/09/22');
    const [opponentStats, setOpponentStats] = useState('');

    const calculateRussell = (statline, scoring = leagueScoring) => {
        let runningScore = 0
        let league_scoring_vals = Object.values(scoring);
        let stat_vals = Object.values(statline);
        league_scoring_vals.forEach(
            (d, i) => {
                let score = d * stat_vals[i];
                runningScore += score;
            }
        );
        // console.log('russell calc', league_scoring_vals, stat_vals)
        return Math.round(runningScore * 100) / 100;
    }

    return (
        <PlayerContext.Provider value={{
            allPlayersDict,
            teamsDict,
            currentSeasonSchedule,
            remainingSeasonSchedule,
            injuries,

            matchedPlayers, setMatchedPlayers,
            displayedPlayer, setDisplayedPlayer,
            displayedTeam, setDisplayedTeam,
            displayedGames, setDisplayedGames,
            opponentStats, setOpponentStats,

            leagueScoring, setLeagueScoring,
            calculateRussell
        }}>
            <div className='NASHBoard-div'>
                <div className='my-team-div'>
                    <div className='NASHBoard-title-div'>
                        <p className='NASHBoard-title'><span title='NASH = Not All Stars Here' style={{ fontSize: 'larger', fontWeight: 700 }}>NASHBoard </span><span style={{ fontSize: 'smaller' }}>Last updated: {todaysDate}</span></p>
                    </div>
                    <PlayerDisplay />
                </div>
                <div className='search-player-div'>
                    <SearchPlayer />
                </div>
                <div className='league-scoring-div'>
                    <LeagueSettings />
                </div>
            </div>
        </PlayerContext.Provider>
    )
};

export default DashBoard;