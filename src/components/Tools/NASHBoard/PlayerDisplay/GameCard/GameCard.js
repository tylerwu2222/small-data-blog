import { useEffect, useContext, useState } from 'react'

import teams from '../../Data/teams.json';
import { PlayerContext } from '../../NASHBoard';
import './GameCard.css'
// import {}

const showGame = (game) => {
    console.log('clicked',game);
}

const GameCard = () => {
    const {
        displayedGames, setDisplayedGames,
        displayedTeam
    } = useContext(PlayerContext);

    let game_cards = displayedGames ? displayedGames.map((g,i) => {
        let opponent = displayedTeam == g.home ? g.away : g.home;
        let homeAway = displayedTeam == g.home ? 'Home' : 'Away';
        return (
            <div key={i} className='game-card-div' onClick={() =>showGame(g)}>
                {/* <p>Opponent: {opponent}</p> */}
                <img className="game-card-team-icon-img" src={require('../../Data/team_logos/' + opponent + ".jpg")} alt={opponent + ".jpg"}></img>
            </div>
        )

    }) : <p></p>;
    return (
        <div className='game-card-container'>
            {game_cards}
        </div>
    )
}

export default GameCard;