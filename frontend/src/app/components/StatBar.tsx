import React from 'react'

import LinearProgress from '@mui/material/LinearProgress';

const StatBar = ({label, value}: {label: string, value: number}) => {
  return (
    <>
        <p style={{alignSelf: "flex-start", margin: "10px 0px 5px 0px", fontSize: 12}}>{label}</p>
        <LinearProgress 
            variant="determinate" 
            value={value*100/6}
            sx={{'& .MuiLinearProgress-bar': {backgroundColor: '#99f969'}}} 
            style={{width: '100%', height: 8, color: '#99f969', backgroundColor: '#e0e0e0', borderRadius: 5}} 
        />
    </>
  )
}

export default StatBar