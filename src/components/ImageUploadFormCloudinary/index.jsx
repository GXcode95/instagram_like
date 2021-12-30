import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { useDropzone } from "react-dropzone"
import { projectFirestore } from 'config/firebase'
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
import ImagesToUpload from './ImagesToUpload'

const ImageUploadFormCloudinary = ({setImgList, imgList}) => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState([])
  const imagesCollectionRef = collection(projectFirestore, "gallery")
  const nbMaxImg = 1

  const onDrop = React.useCallback(async (acceptedFiles, rejFiles) => {
      acceptedFiles.forEach(async (acceptedFile) => {
        setFiles(old => [...old, acceptedFile])
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: 'image/jpeg, img/png'
  })

  const handleUpload = async () => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`
    const folder = "mygram"

    files.map(
      async (acceptedFile, i) => {
        const formData = new FormData()
        formData.append("file", acceptedFile)
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
        formData.append("folder", folder)

        const response = await fetch(url, {
          method: "post",
          body: formData,
        })
        const data = await response.json()
        if(data.error) {
          data.error.message === "Invalid image file" ?
            setError("Seul les fichier png et jpeg sont acceptés") :
            setError(`Désolé, il semble il un problème inconnnu(${data.error.message})`)
        }

        // Upload the image id and the creation date to firestore
        const payload =  { cloudId: data.public_id, cloudFolder: folder, createdAt: serverTimestamp()  }
        await addDoc(imagesCollectionRef, payload )
        if (i === files.length - 1 ) {
          reloadImg(payload)
          setFiles([])
        }
      }
    )
  }
  const handleClick = () => {
    if (files.length <= nbMaxImg) {
        setError(null)
        handleUpload()
    } else {
      setError(`Pas plus de ${nbMaxImg} fichier(s) à la fois, merci pour l'espace de mon cloud.`)
    }
  }

  const reloadImg = (payload) => {
    setImgList([payload, ...imgList])
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="1em"
    >
      {error && (
        <h4 style={{color:"red"}}>{error}</h4>
      )}
      <Box padding="3em" sx={{ border: "3px dashed rgb(255, 193, 239)" }}  {...getRootProps()} >
        <input {...getInputProps()} />
        {isDragActive ?
          <p style={{color: "rgba(248, 130, 219, 0.7)"}}>Clicker pour ajouter des fichier</p> :
          <p style={{color: "rgba(248, 130, 219, 0.7)"}}>Glisser / déposer ou cliquer pour ajouter des fichiers</p>
        }
      </Box>
      <ImagesToUpload files={files} setFiles={setFiles} />
      
      {files.length > 0 &&
        <Button variant="contained" color="success" onClick={handleClick}>
          Upload
        </Button>
      }
    </Box>
  )
}

export default ImageUploadFormCloudinary