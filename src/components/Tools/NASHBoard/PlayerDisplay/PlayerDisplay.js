import { useContext } from 'react'
import { PlayerContext } from '../NASHBoard';

import '../NASHBoard.css'
import './PlayerDisplay.css'

const PlayerDisplay = () => {
    const { displayedPlayer } = useContext(PlayerContext);
    // console.log('pldasd', displayedPlayer);

    return (
        <div className="player-display-div">
            <div className='profile-div'>
                <input type="button" value="Add Player"></input>
                <p>{displayedPlayer['full_name']}</p>
                <p>{displayedPlayer['id']}</p>
                <img className="displayed-player-img" src={require('../Data/player_headshots/' + displayedPlayer['id'] + ".jpg")} alt={displayedPlayer['id'] + ".jpg"}></img>
            </div>
            <div className='week-games-carousel-div'>
                
            </div>
            <div className='notes-div'>

            </div>
        </div>
    )

}

export default PlayerDisplay;