import './NASHBoard.css'
import { useState, useEffect, createContext } from "react";

import PlayerDisplay from './PlayerDisplay/PlayerDisplay';

import allPlayersDict from './Data/active_players.json'

const NBA = require('nba');
const BBRef = require('basketball-reference-js')

const PositionFilters = ['ALL', 'PG', 'SG', 'SF', 'C', 'Available'];
const SortFilters = ['Season Avg', 'Trending Up'];

export const PlayerContext = createContext();

// NASHBoard = NBA All Star Hub Board
const DashBoard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [matchedPlayers, setMatchedPlayers] = useState(allPlayersDict);
    const [displayedPlayer, setDisplayedPlayer] = useState(
        {
            "id": 201566,
            "full_name": "Russell Westbrook",
            "first_name": "Russell",
            "last_name": "Westbrook",
            "is_active": true
        }
    );

    const searchPlayer = (query = "a") => {
        query = query.toLowerCase();
        // search for query among all active players
        const filteredPlayers = allPlayersDict.filter(player => player['full_name'].toLowerCase().includes(query));
        return filteredPlayers;
    }

    const getWeeklyGames = async (player) => {
        const games = await BBRef.games.get(new Date(2019, 2, 15));
          return games;
      };

    // update weekly games when displayed player changes
    useEffect(() => {
        console.log('testing endpoints');
        getWeeklyGames().then((p) => {
            console.log(p);
          });
        // console.log('teams',NBA;
    }, [displayedPlayer]);

    // update search matched players when search terms change
    useEffect(() => {
        setMatchedPlayers(searchPlayer(searchTerm))
    }, [searchTerm]);

    return (
        <PlayerContext.Provider value={{
            displayedPlayer
        }}>
            <div className='NASHBoard-div'>
                {/* <h4>NASH Board</h4> */}
                <div className='my-team-div'>
                    <PlayerDisplay />
                </div>
                <div className='search-player-div'>
                    <div className="filter-players-div">
                        <input type="text" id="player-search-input" placeholder="Search Player" onChange={e => setSearchTerm(e.target.value)} size="20" />
                        {
                            PositionFilters.map(position => {
                                return <input type="button" value={position}></input>
                            })
                        }
                    </div>
                    <div className="player-cards-div-flex">
                        {matchedPlayers.map(player => {
                            return (
                                <div className="player-card" onClick={() => setDisplayedPlayer(player)}>
                                    <p className="player-card-name">{player['full_name']}</p>
                                    <img className="player-card-img" src={require('./Data/player_headshots/' + player['id'] + ".jpg")} alt={player['id'] + ".jpg"}></img>
                                </div>
                            )
                        }
                        )
                        }
                    </div>
                </div>
            </div>
        </PlayerContext.Provider>
    )
};

export default DashBoard;