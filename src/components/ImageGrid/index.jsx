import React from 'react';
import { Box, Card,  IconButton } from '@mui/material';
import './style.scss';
import CloudImage from './CloudImage';
import { doc, deleteDoc } from "firebase/firestore";
import { projectFirestore } from 'config/firebase';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ImageGrid = ({ setSelectedImg, imgList, setImgList }) => {

  const handleDelete = async (id) => {
    if(window.confirm("Supprimer l'image ?")) {
      await deleteDoc(doc(projectFirestore, "gallery", id))
      const tmpList = imgList.filter(image => image.id != id )
      setImgList(tmpList)
    }
  }

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
      {imgList.length > 0 && imgList.map((image, i) => (
        <Card className="img-wrap" key={image.cloudId} elevation={8}>
          <IconButton onClick={e => handleDelete(image.id)} sx={{position:"absolute", top:0, right:0}}>
            <DeleteForeverIcon color="black" sx={{ fontSize: "15px"}}/>
          </IconButton>

  
          <div onClick={ e => setSelectedImg(image.cloudId) }>
            <CloudImage id={`${image.cloudId}`} key={image.cloudId} lazy={i > 9}/>
          </div>
        </Card>
      ))}
    </Box>
  )

}
export default ImageGrid
