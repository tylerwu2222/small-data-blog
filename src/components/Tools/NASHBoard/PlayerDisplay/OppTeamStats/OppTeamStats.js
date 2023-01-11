import { useEffect, useContext, useState } from 'react'
// import teams from '../../Data/teams.json';
import team_splits from '../../Data/team_splits.json';
import { PlayerContext } from '../../NASHBoard';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import BasicSwitch from '../../../../Modules/BasicSwitch/BasicSwitch';

// const displayed_stats = ['home/away','broadcast','time-zone'];
const displayed_stats_basic = ['points', 'assists', 'rebounds', 'blocks', 'steals', 'turnovers', 'personal_fouls'];
const displayed_stats_advanced = [
    'points', 'points_in_paint', 'three_points_made', 'free_throws_made',
    'second_chance_pts', 'points_off_turnovers', 'fast_break_pts', 'bench_points',
    'assists', 'turnovers',
    'blocks',
    'rebounds', 'def_rebounds', 'off_rebounds'];

export default function OppTeamStats() {
    const {
        displayedTeam,
        displayedGames
    } = useContext(PlayerContext);
    const [statsToggledStatus, setStatsToggledStatus] = useState(false);
    const [statsAdvanced, setStatsAdvanced] = useState(displayed_stats_basic);

    const toggleAdvancedStats = () => {
        // swithc stats
        if (statsToggledStatus) {
            setStatsAdvanced(displayed_stats_basic);
        }
        else {
            setStatsAdvanced(displayed_stats_advanced);
        }
        // toggle status
        setStatsToggledStatus(!statsToggledStatus);
    };

    let opp_stats_table_header = displayedGames ? displayedGames.map((g, i) => {
        let opponent = displayedTeam == g.home ? g.away : g.home;
        let game_date = new Date(g.scheduled).toLocaleString(undefined, { month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        return (
            <TableCell align="right">
                <b style={{ fontSize: 'smaller' }}>{displayedTeam == g.home ? "vs " : "@ "}{opponent.split(" ").pop()}
                    <img className="game-card-team-icon-img" src={require('../../Data/team_logos/' + opponent + ".jpg")} alt={opponent + ".jpg"}></img>
                </b>
                <p style={{ fontSize: 'x-small' }}>{game_date}</p>
            </TableCell>
        )
    }) : <p></p>;

    // array of objects items = stats... [{game1},{game2}]
    let opp_stats_table_body = displayedGames ? statsAdvanced.map((stat) => {
        // let opponentStatsDict = {};
        let opponentStatsList = []
        // console.log('displayedgames', displayedGames);
        displayedGames.map((g) => {
            let opponent = displayedTeam == g.home ? g.away : g.home;
            let stats = team_splits[opponent];
            let opp_stats = stats['opponent'];
            // opponentStatsDict[opponent] = opp_stats[stat]
            opponentStatsList.push(opp_stats[stat]);
        });
        // console.log('OSL', opponentStatsList);
        return opponentStatsList;

    }) : [];

    let national_TV_stats = displayedGames ? displayedGames.map(g => {
        // console.log('nat tv', g.locale);
        return <TableCell align="right">{g.locale == 'National' ? 'Yes' : 'No'}</TableCell>
    }) : [];

    return (
        <>
            {/* <h4 style={{ margin: 0, display: 'inline-block', width: 'auto' }}>Average Stats of Teams Playing the...</h4> */}
            <p><BasicSwitch label='Show advanced stats' onChange={toggleAdvancedStats} /></p>
            <TableContainer component={Paper}>

                <Typography
                    sx={{ paddingLeft: '16px', paddingTop: '10px' }}
                    variant="h8"
                    id="tableTitle"
                    component="div"

                >
                    Average Stats of Teams Playing the...
                </Typography>

                <Table sx={{ maxWidth: 200 }} size="small" aria-label="a dense table">

                    <TableHead style={{ whiteSpace: 'nowrap' }}>
                        <TableRow>
                            <TableCell style={{ verticalAlign: 'middle' }}><b>Stat\Team</b></TableCell>
                            {opp_stats_table_header}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow
                            key={'national_TV'}
                            statName={'national_TV'}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell><b>{'national_TV'}</b></TableCell>
                            {national_TV_stats}
                        </TableRow>
                        {opp_stats_table_body.map((statType, statIndex) => (
                            <TableRow
                                key={statsAdvanced[statIndex]}
                                statName={statsAdvanced[statIndex]}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell><span style={{ fontWeight: displayed_stats_basic.includes(statsAdvanced[statIndex]) ? 700 : 400, fontSize: displayed_stats_basic.includes(statsAdvanced[statIndex]) ? 'normal' : 'smaller'}}>{statsAdvanced[statIndex]}</span></TableCell>
                                {opp_stats_table_body[statIndex].map((teamStat) => {
                                    return (
                                        <TableCell align="right">{teamStat}</TableCell>
                                    )
                                }
                                )}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
}
