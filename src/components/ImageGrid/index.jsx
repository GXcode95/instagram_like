import React from 'react';
import { Box } from '@mui/material';
import './style.scss';
import CloudImage from './CloudImage';
import { motion } from 'framer-motion'

const ImageGrid = ({ setSelectedImg, imgList }) => {
  

  return (
    <Box 
      sx={{ 
        width: "100%",
        display:"flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        mt: 3
      }}
    >
      {imgList.length > 0 && imgList.map((image) => (
        <div 
          key={image.cloudId}
          className="img-wrap"
          onClick={ e => setSelectedImg(image.cloudId) }
        >
          <CloudImage id={`${image.cloudId}`} key={image.cloudId} />
        </div>
      ))}
      <CloudImage />
    </Box>
  )

}
export default ImageGrid

{/* 
  
  <div className="img-grid">
    {docs && docs.map( doc => (
      <motion.div 
      className="img-wrap" 
        key={doc.id}
        onClick={ e => setSelectedImg(doc.url)}
        >
        <img src={doc.url} alt="gallery item" width="500" height="500" />
      </motion.div>
    ))}
  </div>  

*/}