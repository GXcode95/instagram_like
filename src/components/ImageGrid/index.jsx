import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { Image } from 'cloudinary-react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import './style.scss';
import CloudImage from './CloudImage';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("gallery")

  return (
    <Box 
      sx={{ 
        width: "100%",
        ml: "5%", mt: 3,
        display:"flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
      }}
    >
      {docs.map((doc) => (
        <div onClick={ e => setSelectedImg(doc.cloudId)} >
          <CloudImage id={`${doc.cloudId}`} key={doc.cloudId} />
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