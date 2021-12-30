import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import './style.scss'

const Github = () => {
  return (
    <a href="https://github.com/GXcode95/instagram_like" className='my-github'>
      <GitHubIcon sx={{fontSize:"50px", color: "rgba(248, 130, 219, 0.45)"}}/>      
    </a>
  )
}
    
export default Github
