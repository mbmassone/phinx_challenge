import React from 'react'

const BattleResultMessage = ({winner}: {winner: string}) => {
    return (
        <p>{winner} wins!</p>
    )
}

export default BattleResultMessage