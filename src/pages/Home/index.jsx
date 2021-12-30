import React from 'react';
import { Container } from '@mui/material'
import ImageUploadFormCloudinary from 'components/ImageUploadFormCloudinary';
import ImageGrid from 'components/ImageGrid';
import Modal from 'components/ImageModal';
import 'style/index.scss'
const Home = () => {
  const [selectedImg, setSelectedImg] = React.useState(null)

  return (
    <Container>
      <ImageUploadFormCloudinary />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/> }
    </Container>
  )
}
    
export default Home
