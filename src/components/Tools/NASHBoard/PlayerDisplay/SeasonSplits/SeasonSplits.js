import { useEffect, useState, useContext } from 'react'
import { PlayerContext } from '../../NASHBoard';
// import allPlayerSplits from '../../Data/player_splits.json';
import './SeasonSplits.css'

const stat_abbr = {
    'minutes': 'MIN',
    'points': 'PTS',
    'rebounds': 'REB',
    'off_rebounds': 'OFFREB',
    'def_rebounds': 'DEFREB',
    'assists': 'AST',
    'steals': 'STL',
    'blocks': 'BLK',
    'field_goals_missed': 'FGMiss',
    'free_throws_missed': 'FTMiss',
    'turnovers': 'TO',
    'personal_fouls': 'PF',
    'flagrant_fouls': 'FF'
}

const SeasonSplits = () => {
    const {
        displayedPlayer,
        calculateRussell,
        leagueScoring,
        allPlayerSplits 
    } = useContext(PlayerContext);

    const getCondensedSplits = (allSplits, year = '2022', type = 'average') => {
        const yearSplits = allSplits[year][type];
        const subCategories = Object.keys(yearSplits).slice(0, 11).concat(Object.keys(yearSplits).slice(14, 20)).concat(Object.keys(yearSplits).slice(26, 34));
        const condensedSplits = Object.keys(yearSplits)
            .filter(key => subCategories.includes(key))
            .reduce((obj, key) => {
                obj[key] = yearSplits[key];
                return obj;
            }, {});
        condensedSplits['field_goals_missed'] = (condensedSplits['two_points_att'] + condensedSplits['three_points_att']) - (condensedSplits['two_points_made'] + condensedSplits['three_points_made']);
        condensedSplits['free_throws_missed'] = condensedSplits['free_throws_att'] - condensedSplits['free_throws_made']
        // console.log('subcats', condensedSplits);
        return condensedSplits;
    }

    const [playersSplits, setPlayersSplits] = useState(getCondensedSplits(allPlayerSplits['Russell Westbrook']));
    const [displayedPlayerScore, setDisplayedPlayerScore] = useState(0);
    const [displayedPlayerStatline, setDisplayedPlayerStatline] = useState([]);

    // update season splits when player changes
    useEffect(() => {
        setPlayersSplits(getCondensedSplits(allPlayerSplits[displayedPlayer['full_name']]));
    }, [displayedPlayer]);

    // update statline array when player changes
    useEffect(() => {

        let orderedStatline = Object.keys(playersSplits)
            .filter(key => Object.keys(stat_abbr).includes(key) && !['off_rebounds', 'def_rebounds', 'minutes'].includes(key))
            .reduce((obj, key) => {
                obj[key] = playersSplits[key];
                return obj;
            }, {});
        orderedStatline['tech'] = 0;
        // console.log('setting displayed player stat', orderedStatline);
        setDisplayedPlayerStatline(orderedStatline);
    }, [playersSplits]);

    // calculate fantasy score when player statline or league scoring changes
    useEffect(() => {
        // console.log('statline', displayedPlayerStatline, Object.keys(displayedPlayerStatline).length);
        // console.log('statline/scoring changed')
        setDisplayedPlayerScore(() => calculateRussell(displayedPlayerStatline));
        // console.log('new score', displayedPlayerScore);
        // }, [displayedPlayerStatline]);
    }, [displayedPlayerStatline, leagueScoring]);

    return (<>
        <div className='player-splits-flex'>
            <h4 style={{ margin: '0px' }}>Season Splits</h4>
            <div className='player-avg-splits-div'>
                {
                    Object.keys(stat_abbr).map(k => {
                        if (k == 'off_rebounds') {
                            return <span className='season-stat-p-small'> (O: {Math.round(playersSplits[k] * 100) / 100}</span>;
                        }
                        else if (k == 'def_rebounds') {
                            return <span className='season-stat-p-small'> / D: {Math.round(playersSplits[k] * 100) / 100})</span>;
                        }
                        else if (k == 'rebounds') {
                            return <span className='season-stat-p'>{stat_abbr[k]}: {Math.round(playersSplits[k] * 100) / 100}  </span>;
                        }
                        else if (k == 'blocks') {
                            return <>
                                <p className='season-stat-p'>{stat_abbr[k]}: {Math.round(playersSplits[k] * 100) / 100}</p>
                                <hr style={{ borderTop: 'dashed 1px', borderBottom: 'none', backgroundColor: 'transparent' }}></hr>
                            </>;
                        }
                        else {
                            return <p className='season-stat-p'>{stat_abbr[k]}: {Math.round(playersSplits[k] * 100) / 100}</p>;
                        }
                    })
                }
            </div>
            {/* <hr style={{borderTop: 'dashed 1px'}}></hr> */}
            <div className='player-fantasy-div'>
                <p style={{ marginBottom: '5px' }}>Fantasy Score: {displayedPlayerScore}</p>
            </div>
        </div>
        {/* <p>{allPlayerSplits['2022']['average']['minutes']}</p> */}
    </>)
};

export default SeasonSplits;