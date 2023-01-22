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
        const players = JSON.parse(localStorage.getItem("team"));
        if(Object.keys(players).includes(playerObject['full_name'])){
            setDisplayedPlayer(players[playerObject['full_name']]);
        }
        else{
            setDisplayedPlayer(playerObject)
        // console.log('clicked player', playerObject);
        }
    }

    return (
    <>
        {/* <p>{playerName}</p> */}
        <img className = 'team-tab-img' title={playerObject['full_name']} onClick={()=>{showPlayer()}} src={require('../../Data/player_headshots/' + playerObject['id'] + '.jpg')}></img>
    </>
    )
}

export default TeamTab;