import { useEffect, useContext, useState } from 'react'
// import teams from '../../Data/teams.json';
import team_splits from '../../Data/team_splits.json';
import { PlayerContext } from '../../NASHBoard';
import './GameCard.css'

const GameCard = () => {
    const {
        displayedGames, setDisplayedGames,
        displayedTeam,
        opponentStats, setOpponentStats
    } = useContext(PlayerContext);

    const showTeamStats = (team) => {
        let stats = team_splits[team];
        let opp_stats = stats['opponent'];
        let self_stats = stats['self'];
        setOpponentStats('Opponent Averages:' + JSON.stringify(opp_stats, null, 2));
    }

    let game_cards = displayedGames ? displayedGames.map((g, i) => {
        let opponent = displayedTeam == g.home ? g.away : g.home;
        let homeAway = displayedTeam == g.home ? 'Home' : 'Away';
        return (
            <div key={i} className='game-card-div' onClick={() => showTeamStats(opponent)}>
                {/* <p>Opponent: {opponent}</p> */}
                <p className='home-away-p'>{homeAway}</p>
                <img className="game-card-team-icon-img" src={require('../../Data/team_logos/' + opponent + ".jpg")} alt={opponent + ".jpg"}></img>
            </div>
        )

    }) : <p></p>;

    return (
        <>
            <div className='game-card-container'>
                {game_cards}
            </div>
            <div className='game-card-opp-stats'>
                <pre>
                    {opponentStats}
                </pre>
            </div>
        </>
    )
}

export default GameCard;