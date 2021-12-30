import React from 'react'
import { Image } from 'cloudinary-react'
import './style.scss'
import { Box } from '@mui/material'
const CloudImage = ({id, size=300, crop="fill"}) => {

  return (
    <Box width={size} height={size} sx={{bgcolor: "white"}}>

      <Image
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={id}
        height={size}
        width={size}
        crop={crop}
        ar="1:1"
        />
    </Box>
  )
}
    
export default CloudImage
