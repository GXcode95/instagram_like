import React from 'react'
import useStorage from '../../hooks/useStorage'

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file)

  React.useEffect(
    () => {
      if (url) {
        setFile(null)
      }
    }, [url, setFile]
  )

  return (
    <div className="progressBar"> 
      {progress}%
    </div>
  )
}


export default ProgressBar