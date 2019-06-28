import React from 'react'
import styled from 'styled-components'

import PanelScoreboard from './PanelScoreboard'

const PanelScore = styled.div`
  display: ${props => props.ready ? 'block' : 'none'}
`

const PanelInputTeam = styled.div`
  display: ${props => props.ready ? 'none' : 'flex'}
  flex-direction: column;
  justify-content: space-around;
`

const Container = styled.div`
  width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
`

function ScoreBoard() {
  const [scores, setScores] = React.useState([])
  const [ready, setReady] = React.useState(false)

  const teamA = React.useRef()
  const teamB = React.useRef()

  const handleSubmit = () => {
    setScores(
      scores.concat(teamA.current.value, teamB.current.value)
    )
    setReady(true)
  }

  return (
    <Container>
      <PanelInputTeam ready={ready}>
        <h3>Input your team</h3>
        <input ref={teamA} type='text' placeholder='Team A' />
        <input ref={teamB} type='text' placeholder='Team B' />
        <button onClick={handleSubmit}>Submit</button>
      </PanelInputTeam>
      <PanelScore ready={ready}>
        <PanelScoreboard scores={scores} />
      </PanelScore>
    </Container>
  )
}

export default ScoreBoard