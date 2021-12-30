import React from 'react'
import { motion } from 'framer-motion';
import { Image } from 'cloudinary-react'
import './style.scss'
const Modal = ({selectedImg, setSelectedImg}) => {

  const handleClick = (e) => {
    // prevent to close the modal when clicking on the image itself
    if( e.target.classList.contains('backdrop'))
      setSelectedImg(null) 
  }
  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

    >
       <Image
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={selectedImg}
      />
    </motion.div>
  )
}
export default Modal