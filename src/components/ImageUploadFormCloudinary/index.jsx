import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { useDropzone } from "react-dropzone"
import { projectFirestore } from 'config/firebase'
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
import ImagesList from './ImagesList'

const ImageUploadFormCloudinary = () => {
  const [files, setFiles] = useState([])
  const imagesCollectionRef = collection(projectFirestore, "gallery")

  const onDrop = React.useCallback(async (acceptedFiles) => {
    acceptedFiles.forEach(async (acceptedFile) => {
      setFiles(old => [...old, acceptedFile])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "images/*"
  })

  const handleClick = async () => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`
    const folder = "asdto/sample"

    let publicIdList=[]
    files.map(
      async (acceptedFile, i) => {
        const formData = new FormData();
        formData.append("file", acceptedFile);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
        formData.append("folder", folder)

        const response = await fetch(url, {
          method: "post",
          body: formData,
        })
        const data = await response.json()

        publicIdList.push(data.public_id)
        alert(i)

        // Upload the image id and the creation date to firestore
        await addDoc(imagesCollectionRef, { cloudId: data.public_id, cloudFolder: folder, createdAt: serverTimestamp() } )

        if (i === files.length - 1) alert(files.length)
      }
    )
  }

  const UploadImageIdToFirestore = async (iDList) => {
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="1em"
    >
      <Box padding="1em" sx={{ border: "1px dashed red" }}  {...getRootProps()} >
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Clicker pour ajouter des fichier</p> :
            <p>Glisser / déposer ou cliquer pour ajouter des fichiers</p>
        }
      </Box>
      <ImagesList files={files} setFiles={setFiles} />
      {files.length > 0 && 
        <Button variant="contained" color="success" onClick={handleClick}> 
          Upload
        </Button>
      }
    </Box>
  )
}

export default ImageUploadFormCloudinary