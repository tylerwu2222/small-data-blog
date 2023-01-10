import { useEffect, useContext, useState } from 'react'
// import teams from '../../Data/teams.json';
import team_splits from '../../Data/team_splits.json';
import { PlayerContext } from '../../NASHBoard';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { display } from '@mui/system';

// const displayed_stats = ['home/away','broadcast','time-zone'];
const displayed_stats_basic = ['points', 'assists', 'rebounds', 'blocks', 'steals', 'personal_fouls'];
// const displayed_stats_complex = ['points_in_point','points_off_turnovers','fast_break_pts','assists','blocks','def_rebounds','off_rebounds'];

export default function OppTeamStats() {
    const {
        displayedTeam,
        displayedGames
    } = useContext(PlayerContext);

    let opp_stats_table_header = displayedGames ? displayedGames.map((g, i) => {
        let opponent = displayedTeam == g.home ? g.away : g.home;
        return (
            <TableCell align="right">{opponent}</TableCell>
        )
    }) : <p></p>;

    // array of objects items = stats... [{game1},{game2}]
    let opp_stats_table_body = displayedGames ? displayed_stats_basic.map((stat) => {
        // let opponentStatsDict = {};
        let opponentStatsList = []
        displayedGames.map((g) => {
            let homeAway = displayedTeam == g.home ? 'Home' : 'Away';
            let opponent = displayedTeam == g.home ? g.away : g.home;
            let stats = team_splits[opponent];
            let opp_stats = stats['opponent'];
            // opponentStatsDict[opponent] = opp_stats[stat]
            opponentStatsList.push(opp_stats[stat]);
        });
        // console.log('OSD',opponentStatsDict);
        // console.log('OSL',opponentStatsList);
        return opponentStatsList;
        
    }): [];

    // console.log('table body', opp_stats_table_body);

    return (
        <>
        <h4 style={{margin:0}}>Stats of Teams Opposing:</h4>
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 200 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Stat</b></TableCell>
                        {opp_stats_table_header}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {opp_stats_table_body.map((statType,statIndex) => (
                        <TableRow
                            key={statType}
                            statName={statType}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell><b>{displayed_stats_basic[statIndex]}</b></TableCell>
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
