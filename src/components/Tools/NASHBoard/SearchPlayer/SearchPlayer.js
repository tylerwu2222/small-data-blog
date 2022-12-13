import './SearchPlayer.css'

import { useEffect, useState, useContext } from "react";
import { PlayerContext } from "../NASHBoard";

const PositionFilters = ['ALL', 'PG', 'SG', 'SF', 'C', 'Available'];
const SortFiltersMap = {
    '-- Select Filter --': '',
    'Fantasy Score': 'fantasy',
    'Points (-Misses)': 'points_adjusted',
    'Free Throws (-Misses)': 'free_throws',
    'Rebounds': 'rebounds',
    'Def Rebounds': 'def_rebounds',
    'Off Rebounds': 'off_rebounds',
    'Assists': 'assists',
    'Assists (-Turnovers)': 'assists-turnover',
    'Blocks': 'blocks',
    'Steals': 'steals',
    'Fouls Drawn': 'fouls_drawn',
    'Fouls Committed': 'personal_fouls',
    'Turnovers': 'turnovers'
};
const SortFilters = Object.keys(SortFiltersMap);

const SearchPlayer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [minGames, setMinGames] = useState(1);
    const {
        matchedPlayers, setMatchedPlayers,
        setDisplayedPlayer, allPlayersDict,
        setOpponentStats,
        allPlayerSplits,
        calculateRussell,
        injuries
    } = useContext(PlayerContext);



    // HANDLE ALL FILTERS //
    // update search matched players when ANY search term/filter changes
    useEffect(() => {
        // setMatchedPlayers(searchPlayer())
        // console.log('new queries',minGames, searchTerm,selectedFilter);
        setMatchedPlayers(runFilters())
    }, [searchTerm, selectedFilter, minGames]);

    // runs all filters & queries on original data
    const runFilters = () => {
        let filteredPlayers;
        // 1) filter for number of games
        filteredPlayers = changeMinGames();
        console.log(filteredPlayers);

        // 2) filter by search query
        filteredPlayers = searchPlayer(filteredPlayers);

        // 3) sort by statistic
        // sortPlayers();
        filteredPlayers = sortPlayers(filteredPlayers);

        return filteredPlayers;
    };

    // SEARCH //
    const searchPlayer = (filteredPlayers) => {
        let query = searchTerm.toLowerCase();
        // search for query among all active players
        // let filteredPlayers = allPlayersDict.filter(player => player['full_name'].toLowerCase().includes(query));
        let searchedPlayers = filteredPlayers.filter(player => player['full_name'].toLowerCase().includes(query));
        return searchedPlayers;
    }

    // SORT & FILTER //
    const getCondensedSplits = (allSplits, year = '2022', type = 'average') => {
        const yearSplits = allSplits[year][type];
        console.log('SPSPLITS',yearSplits);
        const subCategories = Object.keys(yearSplits).slice(0, 11).concat(Object.keys(yearSplits).slice(14, 20)).concat(Object.keys(yearSplits).slice(26, 34));
        const condensedSplits = Object.keys(yearSplits)
            .filter(key => subCategories.includes(key))
            .reduce((obj, key) => {
                obj[key] = yearSplits[key];
                return obj;
            }, {});
        // TESTING WITH RANDOM NUMBER GAMES PLAYED
        condensedSplits['games_played'] = Math.round(Math.random() * 20);
        condensedSplits['field_goals_missed'] = (condensedSplits['two_points_att'] + condensedSplits['three_points_att']) - (condensedSplits['two_points_made'] + condensedSplits['three_points_made']);
        condensedSplits['free_throws_missed'] = condensedSplits['free_throws_att'] - condensedSplits['free_throws_made']
        // console.log('subcats', condensedSplits);
        return condensedSplits;
    }

    const sortPlayers = (filteredPlayers, direction = 'descending') => {
        // let playerNames = matchedPlayers.map(p => p['full_name']);
        let playerNames = filteredPlayers.map(p => p['full_name']);
        let playersSplits = playerNames.map(p => getCondensedSplits(allPlayerSplits[p]));
        // console.log('sds', playersSplits);
        let playersStats;
        if (selectedFilter == SortFilters[0]) {
            return filteredPlayers;
        }
        else if (selectedFilter == 'Fantasy Score') {
            playersStats = playersSplits.map(p => calculateRussell(p));
        }
        else if (selectedFilter == 'Points (-Misses)') {
            playersStats = playersSplits.map(p => p['points'] - p['field_goals_missed'] - p['free_throws_missed']);
        }
        else if (selectedFilter == 'Assists (-Turnovers)') {
            playersStats = playersSplits.map(p => p['assists'] - p['turnovers']);
        }
        // free throw data not calcuated correctly
        else if (selectedFilter == 'Free Throws (-Misses)') {
            playersStats = playersSplits.map(p => p['free_throws_made'] - p['free_throws_missed']);
        }
        else {
            playersStats = playersSplits.map(p => p[SortFiltersMap[selectedFilter]]);

        }
        // create sortable array of arrays --> sort descending
        let sortable = playerNames.map((n, i) => { return [n, playersStats[i]] });
        if (direction == 'descending') {
            sortable.sort((a, b) => b[1] - a[1]);
        }
        else {
            sortable.sort((a, b) => a[1] - b[1]);
        }
        const sortedNames = sortable.map(a => a[0]);
        const sortedPlayers = sortedNames.reduce(
            (obj, playerName) => {
                // console.log('OJ',obj,playerName);
                obj.push(filteredPlayers.filter(p => p['full_name'] == playerName)[0]);
                return obj;
            },
            []
        );
        // console.log('sortablearray', selectedFilter, sortedPlayers);
        return sortedPlayers;

    }

    const changeMinGames = () => {
        let playersSplits = allPlayersDict.map(p => getCondensedSplits(allPlayerSplits[p['full_name']]));
        let playerNames = allPlayersDict.map(p => p['full_name']);
        let playerGames = playersSplits.map(p => p['games_played']);
        let filterable = playerNames.map((n, i) => { return [n, playerGames[i]] });
        let filtered = filterable.filter(p => p[1] >= minGames)
        const filteredNames = filtered.map(a => a[0]);
        const minGamesPlayers = filteredNames.reduce(
            (obj, playerName) => {
                // console.log('OJ',obj,playerName);
                obj.push(allPlayersDict.filter(p => p['full_name'] == playerName)[0]);
                return obj;
            },
            []
        );
        return minGamesPlayers;
        // return allPlayersDict;
    }

    // SELECT //
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

    // {/* {
    //     PositionFilters.map(position => {
    //         return <input type="button" value={position}></input>
    //     })
    // } */}
    return (
        <>
            <div className="filter-players-div">
                <input type="text" id="player-search-input" placeholder="Search Player" onChange={e => setSearchTerm(e.target.value)} size="20" />

                <select className="filter-players-select" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                    {SortFilters.map(f => {
                        return (
                            <option value={f}>{f}</option>
                        )
                    })}
                </select>
                <span className="min-games-span">
                    <label htmlFor='min-games-input'>Min. games: </label>
                    <input type="text" id="min-games-input" defaultValue={1} onChange={e => setMinGames(e.target.value)}></input>
                </span>
            </div>
            <div className="player-cards-div-flex">
                {matchedPlayers.map(player => {
                    return (
                        <div className="player-card" onClick={() => setDisplayedPlayer(handleSelectPlayer(player))}>
                            <p className="player-card-name">{player['full_name']}</p>
                            <img className="player-card-img" src={require('../Data/player_headshots/' + player['id'] + ".jpg")} alt={player['id'] + ".jpg"}></img>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SearchPlayer;