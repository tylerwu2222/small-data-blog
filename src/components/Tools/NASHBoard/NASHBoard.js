import './NASHBoard.css'
import { useState, useEffect, createContext } from "react";

// update every day
import injuries from './Data/injuries.json';

// update every week
import allPlayerSplits from './Data/player_splits.json';
import currentSeasonSchedule from './Data/season_2022_schedule.json'
import remainingSeasonSchedule from './Data/season_2022_remaining_schedule.json'

// update when new season
import allPlayersDictRaw from './Data/active_players.json';
import allPlayersDictSportRadar from './Data/players.json';
import teamsDict from './Data/teams.json';

import PlayerDisplay from './PlayerDisplay/PlayerDisplay';
import SearchPlayer from './SearchPlayer/SearchPlayer';
import LinkBibble from './LinkBibble/LinkBibble';
import LeagueSettings from './LeagueSettings/LeagueSettings';
import { Link } from 'react-router-dom';

// const NBA = require('nba');
// const BBRef = require('basketball-reference-js')
// console.log('currsznsched',currentSeasonSchedule);
// console.log('rem',remainingSeasonSchedule);

export const PlayerContext = createContext();

const league_scoring = {
    'points': 1,
    'rebounds': 2,
    'assists': 2,
    'steals': 2,
    'blocks': 1,
    'field_goals_missed': -1,
    'free_throws_missed': -1,
    'turnovers': -2,
    'personal_fouls': -1,
    'technical_fouls': -2,
    'flagrant_fouls': -3
};
const league_scoring_stats = Object.keys(league_scoring);

// NASHBoard = NBA All Star Hub Board
const DashBoard = () => {
    // console.log('rostered',Object.keys(allPlayersDictSportRadar))
    // filter out unrostered players
    const allPlayersDict = allPlayersDictRaw
        .filter(p => Object.keys(allPlayersDictSportRadar).includes(p['full_name']));

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
    const [todaysDate, setTodaysDate] = useState('1/10/23');
    const [opponentStats, setOpponentStats] = useState('');

    const calculateRussell = (statline, scoring = leagueScoring) => {
        // console.log('statline and scorring',statline, scoring);
        let runningScore = 0
        // let stat_vals = Object.values(statline);
        league_scoring_stats.forEach(
            // league_scoring_vals.forEach(
            d => {
                let score;
                if (d == 'technical_fouls') {
                    score = 0;
                }
                else {
                    score = scoring[d] * statline[d];
                }
                // console.log('stat prod',d,scoring[d],statline[d])
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
            allPlayerSplits,
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
                        <p className='NASHBoard-title'>
                            <span title='NASH = Not All Stars Here' style={{ fontSize: 'larger', fontWeight: 700 }}>NASHBoard </span>
                            <span style={{ fontSize: 'smaller' }}>Last updated: {todaysDate}</span>
                        </p>
                    </div>
                    <PlayerDisplay />
                </div>
                <div className='search-player-div'>
                    <SearchPlayer />
                </div>
                <div className='link-bibble-div'>
                    <LinkBibble />
                </div>
                <div className='league-scoring-div'>
                    <LeagueSettings />
                </div>
            </div>
        </PlayerContext.Provider>
    )
};

export default DashBoard;