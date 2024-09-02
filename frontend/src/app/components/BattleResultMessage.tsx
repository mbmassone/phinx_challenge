import React from 'react'
import Alert from '@mui/material/Alert';

const BattleResultMessage = ({winner}: {winner: string | null}) => {
    return (
        <div style={{height: 58, margin: "20px 0px"}}>
            {winner && 
                <Alert variant="outlined" severity="info" icon={false} style={{backgroundColor: "lightblue", fontSize: 20, paddingLeft: 30}}>
                    {winner} wins!
                </Alert>
            }
        </div>
    )
}

export default BattleResultMessage