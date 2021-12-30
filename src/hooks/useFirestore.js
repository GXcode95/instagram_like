import { useState, useEffect } from "react";
import { projectFirestore } from 'config/firebase';
import { getDocs, collection } from 'firebase/firestore'


const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const imagesCollectionRef = collection(projectFirestore, collectionName)
 
  useEffect(
    () => {
      const getCollectionDocs = async () => {
        const data = await getDocs(imagesCollectionRef);
        console.log("docs", data.docs)
        data.docs.map(doc=> console.log("ici",doc.data()))
        const formatedDoc = data.docs.map( doc => ({...doc.data(), createdAt: doc.data().createdAt.seconds, id: doc.id}))
        setDocs(formatedDoc.sort((prev, curr) => { return  curr.createdAt - prev.createdAt }))
      }
      getCollectionDocs()
    },[collectionName]
  )
  
  return { docs };
}
export default useFirestore