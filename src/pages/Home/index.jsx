import React from 'react';
import 'style/index.scss'
import ImageUploadFormCloudinary from 'components/ImageUploadFormCloudinary';
import ImageGrid from 'components/ImageGrid';
import Modal from 'components/ImageModal';
import useFirestore from '../../hooks/useFirestore';
import Header from 'components/Header'
import Github from 'components/Github';
import { Container } from '@mui/material'


const Home = () => {
  const [selectedImg, setSelectedImg] = React.useState(null)
  const [imgList, setImgList] = React.useState([])
  const { docs } = useFirestore("gallery")

  React.useEffect(
    ()=> {
      setImgList(docs)
    }, [docs, useFirestore]
  )
  return (
    <Container style={{maxWidth: "90%" }}> 
      <Github />
      <Header />
      <ImageUploadFormCloudinary setImgList={setImgList} imgList={imgList}/>
      <ImageGrid setSelectedImg={setSelectedImg} imgList={imgList} />
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/> }
    </Container>
  )
}
    
export default Home
