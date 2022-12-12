import './SearchPlayer.css'

import { useEffect, useState, useContext } from "react";
import { PlayerContext } from "../NASHBoard";

const PositionFilters = ['ALL', 'PG', 'SG', 'SF', 'C', 'Available'];
const SortFilters = ['Season Avg', 'Trending Up'];

const SearchPlayer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {
        matchedPlayers, setMatchedPlayers,
        setDisplayedPlayer, allPlayersDict,
        setOpponentStats,
        injuries
    } = useContext(PlayerContext);

    // update search matched players when search terms change
    useEffect(() => {
        setMatchedPlayers(searchPlayer(searchTerm))
    }, [searchTerm]);

    const searchPlayer = (query = "a") => {
        query = query.toLowerCase();
        // search for query among all active players
        const filteredPlayers = allPlayersDict.filter(player => player['full_name'].toLowerCase().includes(query));
        return filteredPlayers;
    }

    const calculateSTAT = () => {

    };

    const handleSelectPlayer = (player) => {
        // get injury status from injuries
        let injury_status = injuries.filter(i => i['player_id'] == player.id);
        if (injury_status.length >= 1) {
            let injury = injury_status[0];
            player['injury_status'] = {
                'status': injury.status,
                'injury_date': injury.start_date,
                'injury_update': injury.update_date,
                'injury_desc': injury.comment
            };
        }
        else {
            player['injury_status'] = {}
        }
        setOpponentStats('');
        return player;
    };

    return (
        <>
            <div className="filter-players-div">
                <input type="text" id="player-search-input" placeholder="Search Player" onChange={e => setSearchTerm(e.target.value)} size="20" />
                {/* {
                    PositionFilters.map(position => {
                        return <input type="button" value={position}></input>
                    })
                } */}
            </div>
            <div className="player-cards-div-flex">
                {matchedPlayers.map(player => {
                    return (
                        <div className="player-card" onClick={() => setDisplayedPlayer(handleSelectPlayer(player))}>
                            <p className="player-card-name">{player['full_name']}</p>
                            <img className="player-card-img" src={require('../Data/player_headshots/' + player['id'] + ".jpg")} alt={player['id'] + ".jpg"}></img>
                        </div>
                    )
                }
                )
                }
            </div>
        </>
    )
}

export default SearchPlayer;