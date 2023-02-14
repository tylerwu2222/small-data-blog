import CustomButton from "../../../Modules/CustomButton/CustomButton"
import { PlayerContext } from "../NASHBoard";
import { useState, useContext, useEffect } from "react";

import InputDialog from "../../../Modules/InputDialog/InputDialog";

export default function FantasyJournal({className=''}) {
    const {
        displayedPlayerNotes
    } = useContext(PlayerContext);


    const get_notes = (team_json) => {
        // console.log('team json',team_json,typeof team_json);
        const Players = Object.keys(team_json);
        const Notes = Object.values(team_json).map(p => p['notes']);
        // return Players.map(n=> n);
        return Notes.map((n,i) => {
            const PlayerNotes = <><b>{Players[i]}</b><p style={{whiteSpace: 'pre-wrap'}}>{n}</p></>;
            // console.log('N', PlayerNotes);
            return PlayerNotes;
        })
    };

    const [allPlayersContent, setallPlayersContent] = useState('');

    // update allPlayersContent when one player's notes changes
    useEffect(() => {
        setallPlayersContent(Object.keys(JSON.parse(localStorage.getItem("team"))).length > 0 ? get_notes(JSON.parse(localStorage.getItem("team"))): '');
    }, [displayedPlayerNotes]);

    return (
        <div style={{ padding: '10px 0px', display: 'default' }}>
            <InputDialog
                buttonText={'View Journal'}
                dialogTitle={'Fantasy Journal'}
                descriptionText={<>
                    <p style={{ fontSize: 'smaller' }}>Journal is currently view-only</p>
                    <p>{allPlayersContent}</p>
                </>}
                dialogLabel={'Notes'}
                // dialogText={displayedPlayerNotes}
                // handleChange={e => handleDisplayedNotesChange(e.target.value)}
                className={className}
                viewOnly={true}
            />
        </div>
    )
}
