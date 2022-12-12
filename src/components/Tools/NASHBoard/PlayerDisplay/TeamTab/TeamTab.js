import { useContext, useState } from 'react'
import { PlayerContext } from '../../NASHBoard';

import './TeamTab.css';

const TeamTab = ({playerObject}) => {
    const {
        displayedPlayer, setDisplayedPlayer
    } = useContext(PlayerContext);

    // console.log('playerDict',playerObject);

    // show player when clicked
    const showPlayer = () => {
        setDisplayedPlayer(playerObject)
    }

    return (
    <>
        {/* <p>{playerName}</p> */}
        <img className = 'team-tab-img' title={playerObject['full_name']} onClick={()=>{showPlayer()}} src={require('../../Data/player_headshots/' + playerObject['id'] + '.jpg')}></img>
    </>
    )
}

export default TeamTab;