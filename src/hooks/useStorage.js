import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from 'config/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)
  const [payload, setPayload] = useState(null)
  const imagesCollectionRef = collection(projectFirestore, "images")

  useEffect(
    () => {
      // create a references in the storage default bucket
      const storageRef = ref(projectStorage, file.name) 
      
      // we try to put a file into the ref, and add a state_changed event on it
      // This event will be trigerred multiple time during the upload
      // and we pass it 3 function to execute as argument

      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on('state_changed', 
        (snapshot) => { // Get the progress percentage of the upload, snapshot is info about the file atm event is triger
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + percentage + '% done');
          console.log(snapshot);
          setProgress(percentage);
        },
        (err) => { // Catch the upload error
          setError(err)
        },
        async () => { // get the uploaded file url
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(url)
          setPayload({ url, createdAt: serverTimestamp() })
          await addDoc(imagesCollectionRef, { url, createdAt: serverTimestamp() } )
        }
      )
       
    }, [file]
  )

  return { progress, url, error, payload }
}

export default useStorage