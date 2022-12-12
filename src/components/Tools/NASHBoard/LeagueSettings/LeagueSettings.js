import { useContext, useState, useEffect } from 'react';
import { PlayerContext } from '../NASHBoard';
import './LeagueSettings.css';

const sample_statline = {
    'pt': 20,
    'reb': 10,
    'ast': 10,
    'stl': 1,
    'blk': 3,
    'fg miss': 5,
    'ft miss': 2,
    'turnover': 3,
    'foul': 2,
    'tech': 0,
    'flagrant': 0
};

const LeagueSettings = () => {
    const { leagueScoring, setLeagueScoring, calculateRussell } = useContext(PlayerContext);
    const [sampleStatline, setSampleStatline] = useState(sample_statline);
    const [sampleFantasyScore, setSampleFantasyScore] = useState(0);


    // update sample fantasy score when league scoring or sample statline changes
    useEffect(() => {
        setSampleFantasyScore(calculateRussell(sampleStatline));
        // console.log('sample statline',sampleStatline, Object.keys(sampleStatline).length);
        // console.log('sample score updated');
    }, [leagueScoring, sampleStatline]);

    // update Stats dictionary
    const updateScoring = (value, stat) => {
        // if value is empty set to 0?
        let newLeagueScoring = { ...leagueScoring };
        newLeagueScoring[stat] = value;
        setLeagueScoring(newLeagueScoring);
    };

    const updateSampleStatline = (value, stat) => {
        let newSampleStatline = { ...sampleStatline };
        newSampleStatline[stat] = value;
        setSampleStatline(newSampleStatline);
    };

    return (
        <div className='league-settings-div'>
            <div className='fantasy-scoring-div'>
                <h4 style={{ margin: '0px 0px' }}>Define Fantasy Scoring:</h4>
                {Object.keys(leagueScoring).map(stat => {
                    return (
                        <>
                            <label className='league-settings-label' htmlFor={stat + 'input'}>{stat}: </label>
                            <input className='league-settings-input' id={stat + 'input'} type='text' defaultValue={leagueScoring[stat]} maxLength={2} width={'5px'} onChange={(e) => { updateScoring(e.target.value, stat) }}></input>
                            <hr style={{ margin: '3px 0px' }}></hr>
                        </>
                    )
                })}
            </div>
            <p>Sample Statline:</p>
            <div className='sample-statline-div'>
                <div className='statline-label-div'>
                    {Object.keys(sampleStatline).map(stat => {
                        if (['ast', 'blk', 'ft miss', 'foul'].includes(stat)) {
                            return (
                                <>
                                    <label className='sample-statline-label' htmlFor={'sample-' + stat + '-input'}>{stat}</label>
                                    {/* <input className='sample-statline-input' id={'sample-' + stat + '-input'} type='text' defaultValue={sampleStatline[stat]} maxLength={3} width={'5px'} onChange={(e) => { updateSampleStatline(e.target.value, stat) }}></input> */}
                                    <br />
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <label className='sample-statline-label' htmlFor={'sample-' + stat + '-input'}>{stat}/</label>
                                    {/* <input className='sample-statline-input' id={'sample-' + stat + '-input'} type='text' defaultValue={sampleStatline[stat]} maxLength={3} width={'5px'} onChange={(e) => { updateSampleStatline(e.target.value, stat) }}></input> */}
                                </>
                            )
                        }
                    })}

                </div>
                <div className='statline-input-div'>
                    {Object.keys(sampleStatline).map(stat => {
                        if (['ast', 'blk', 'ft miss', 'foul'].includes(stat)) {
                            return (
                                <>
                                    {/* <label className='sample-statline-label' htmlFor={'sample-' + stat + '-input'}>{stat}</label> */}
                                    <input className='sample-statline-input' id={'sample-' + stat + '-input'} type='text' defaultValue={sampleStatline[stat]} maxLength={3} width={'5px'} onChange={(e) => { updateSampleStatline(e.target.value, stat) }}></input>
                                    <br />
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    {/* <label className='sample-statline-label' htmlFor={'sample-' + stat + '-input'}>{stat}/</label> */}
                                    <input className='sample-statline-input' id={'sample-' + stat + '-input'} type='text' defaultValue={sampleStatline[stat]} maxLength={3} width={'5px'} onChange={(e) => { updateSampleStatline(e.target.value, stat) }}></input>
                                </>
                            )
                        }
                    })}

                </div>
            </div>
            <p>Fantasy Score: {sampleFantasyScore}</p>
        </div>
    )
}

export default LeagueSettings;