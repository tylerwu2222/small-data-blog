import React from 'react'
import './LinkBibble.css'

export default function LinkBibble() {
  const linkDict = {
    'pace': 'https://www.nba.com/stats/teams/advanced?LastNGames=5&dir=A&sort=PACE',
    'defense': 'https://www.nba.com/stats/teams/advanced?LastNGames=5&dir=D&sort=DEF_RATING',
    'assists allowed': 'https://www.teamrankings.com/nba/stat/opponent-assists-per-game',
    'rebounds allowed': 'https://www.teamrankings.com/nba/stat/opponent-total-rebounds-per-game'
  }

  const linkTitleDict = {
    'pace': 'faster pace: good',
    'defense': 'bad defensive rating (larger number): good',
    'assists allowed': 'more assists allowed = good',
    'rebounds allowed': 'more rebounds (especially offensive) allowed = good'
  }
  return (
    <div className='link-container-div'>
      <h4 style={{margin:0}}>Opposing Team Stat Links</h4>
      {Object.keys(linkDict).map(l => {
        return (
          <>
            <a href={linkDict[l]} title={linkTitleDict[l]} target='_blank'>{l}</a>
            <br />
          </>
        )
      }
      )}
    </div>
  )
}
