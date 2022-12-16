import { useEffect, useContext, useState } from 'react'
import { PlayerContext } from '../NASHBoard';

import GameCard from './GameCard/GameCard';
import SeasonSplits from './SeasonSplits/SeasonSplits';
import TeamTab from './TeamTab/TeamTab';

import '../NASHBoard.css'
import './PlayerDisplay.css'

// fantasy week starts on monday, so +1 to all dates
const getCurrentWeek = () => {
    let curr = new Date;
    // first day of week = current day (1-31) - day of week (0-6) [0 is Sunday]
    let first = curr.getDate() - curr.getDay() + 1;
    let last = first + 6; // last day is the first day + 6

    let lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];
    let firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
    // console.log('days', firstday, lastday);
    return [firstday, lastday];
};

const isBetweenDates = (range, date) => {
    return date > range[0] & date <= range[1];
}

const PlayerDisplay = () => {
    const {
        displayedPlayer,
        displayedTeam, setDisplayedTeam,
        displayedGames, setDisplayedGames,
        teamsDict,
        currentSeasonSchedule, remainingSeasonSchedule
    } = useContext(PlayerContext);

    const [myTeam, setMyTeam] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("team");
        const initialValue = JSON.parse(saved);
        return initialValue;
    });

    const [removeButtonVisibility, setRemoveButtonVisibility] = useState(false);

    // set injury status if in data
    let InjuryDiv;
    if (Object.keys(displayedPlayer['injury_status']).length > 0) {
        // console.log('is injrured');
        InjuryDiv = <div className='injury-div'>
            <p>Status: {displayedPlayer['injury_status']['status']}</p>
            <p>Injury date: {displayedPlayer['injury_status']['injury_date']}</p>
            <p>Last updated: {displayedPlayer['injury_status']['update_date'] ? displayedPlayer['injury_status']['update_date'] : displayedPlayer['injury_status']['injury_date']}</p>
            <p>Comment: {displayedPlayer['injury_status']['injury_desc']}</p>
        </div>;
    }
    else {
        InjuryDiv = <></>;
    }

    const getCurrentWeekGames = (teamName) => {
        let played_games = currentSeasonSchedule.filter(game => game['home'] == teamName || game['away'] == teamName)
        // console.log('p', played_games);
        let future_games = remainingSeasonSchedule.filter(game => game['home'] == teamName || game['away'] == teamName)
        // console.log('f', future_games);

        // get current week
        let current_week = getCurrentWeek();
        // get games in span
        const last_5 = played_games.slice(-5);
        const current_games_played = last_5.filter(g => isBetweenDates(current_week, g['scheduled'].split('T')[0]));
        const next_5 = future_games.slice(0, 5);
        const current_games_remaining = next_5.filter(g => isBetweenDates(current_week, g['scheduled'].split('T')[0]));
        const current_games = current_games_played.concat(current_games_remaining);
        return current_games;
    };

    // LOCAL STORAGE //
    // initialize localStorage 
    useEffect(() => {
        let players = JSON.parse(localStorage.getItem("team"));
        if (!players) {
            localStorage.setItem('team', '{}');
        }
    }, []);

    // add player to team (local storage when clicked)
    const addPlayer = () => {
        // console.log('adding player to local storage');
        const players = JSON.parse(localStorage.getItem("team"));
        players[displayedPlayer['full_name']] = displayedPlayer;
        localStorage.setItem('team', JSON.stringify(players));
        setMyTeam(JSON.parse(localStorage.getItem("team")));
        setRemoveButtonVisibility(true);
    };

    const removePlayer = () => {
        const players = JSON.parse(localStorage.getItem("team"));
        delete players[displayedPlayer['full_name']];
        localStorage.setItem('team', JSON.stringify(players));
        setMyTeam(JSON.parse(localStorage.getItem("team")));
        setRemoveButtonVisibility(false);
    };

    // make remove button visible if on team
    useEffect(() => {
        const players = JSON.parse(localStorage.getItem("team"));
        const playerIDs = Object.values(players).map(p => p['id']);
        if (playerIDs.includes(displayedPlayer['id'])) {
            // console.log('remove tru');
            setRemoveButtonVisibility(true);
        }
        else {
            // console.log('rem7ove F');
            setRemoveButtonVisibility(false);
        }
    }, [displayedPlayer]);

    // TEAM STUFF //
    // get weeks schedule based on team
    useEffect(() => {
        setDisplayedGames(getCurrentWeekGames(displayedTeam));
        // console.log('setting games');
    }, [displayedTeam]);

    // get players team when player changes and update team icon
    useEffect(() => {
        let playerTeam = teamsDict.filter(team => {
            let player_ids = team['roster'].map(player => player['id']);
            return (player_ids.includes(displayedPlayer['id']));
        });
        if (playerTeam.length > 0) {
            playerTeam = playerTeam[0]['teamName'];
            if (playerTeam == 'Los Angeles Clippers') {
                playerTeam = 'LA Clippers';
            }
            // setTeamImage('../Data/team_logos/' + displayedTeam + '.jpg');
        }
        else {
            playerTeam = 'Unrostered';
            // setTeamImage('../Data/team_logos/Los Angeles Lakers.jpg');
        }
        setDisplayedTeam(playerTeam);


    }, [displayedPlayer]);

    // team display tabs
    let teamTabs = myTeam ? Object.values(myTeam).map(p => {
        return <TeamTab playerObject={p}></TeamTab>
    }) : <></>;


    return (
        <div className="player-display-div">
            <div className='profile-div'>
                <div className='my-team-tab'>
                    {teamTabs}
                </div>
                <div className='profile-displayed-div'>
                    <input type="button" className="add-player-btn" title="Add this player to your team!" value="Add Player" onClick={() => addPlayer()}></input>
                    <input type="button" title="Remove this player from your team :(" value="Remove Player" onClick={() => removePlayer()} className={removeButtonVisibility ? '' : 'hidden-btn'}></input>
                    <h4>{displayedPlayer['full_name']}</h4>
                    {/* <p>{displayedPlayer['id']}</p> */}
                    <p><img className="team-icon-img" src={require('../Data/team_logos/' + displayedTeam + '.jpg')} alt={displayedTeam + ".jpg"}></img>{displayedTeam}</p>
                    {/* <p><img className="team-icon-img" src={require(teamImage)} alt={displayedTeam + ".jpg"}></img>{displayedTeam}</p> */}
                    <img className="displayed-player-img" src={require('../Data/player_headshots/' + displayedPlayer['id'] + '.jpg')} alt={displayedPlayer['id'] + ".jpg"}></img>
                </div>
            </div>
            <div className='player-splits-div'>
                <SeasonSplits />
            </div>
            <div className='game-cards-div'>
                <GameCard />
            </div>
            {InjuryDiv}
        </div>
    )

}

export default PlayerDisplay;