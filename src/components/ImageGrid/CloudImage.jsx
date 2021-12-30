import React, { useState } from 'react'
import { Image } from 'cloudinary-react'
import { IconButton } from '@mui/material'
import './style.scss'
import  CloseIcon from '@mui/icons-material/Close'

const CloudImage = ({id, size=300, crop="fill"}) => {

  return (
      <Image
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={id}
        height={size}
        width={size}
        crop={crop}
        ar="1:1"
      />
  )
}
    
export default CloudImage
