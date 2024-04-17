import {useSelector} from 'react-redux'
import {Alert, Button, TextInput} from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
 import {app} from '../Firebase'

 import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
     const filePicker=useRef()
    const {currentUser}=useSelector((state)=> state.user)
     const [imageFile ,setimageFile]=useState(null)
      const [imagefileUrl,setimagefileUrl]=useState(null)
      const [imageFileUploadProgress,setimageFileUploadProgress]=useState(true)
      const [imageFileUploadError,setimageFileUploadError]=useState(null)
      console.log(imageFileUploadProgress,imageFileUploadError);
      const handleImageChange=(e)=>{
           const file=e.target.files[0];
           if(file){
            setimageFile(file)
            setimagefileUrl(URL.createObjectURL(file))
           }
        
      };

      useEffect(() => {
        if (imageFile) {
          uploadImage();
        }
      },[imageFile]); // This ensures the effect runs whenever imageFile changes
      
      const uploadImage = async () => {
        
        
         setimageFileUploadError(null)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
      
        // Attach event listeners for upload progress, error, and completion
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimageFileUploadProgress(progress.toFixed(0));
        }, (error) => {
          setimageFileUploadError('could not uploasd file must be less than 2 MB');
           
           setimageFileUploadProgress(null)
           setimageFile(null)
           setimagefileUrl(null)
          
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimagefileUrl(downloadURL);
            console.log(imagefileUrl)
          });
        });
        
      };
           

  return (
     
     
    <div className='max-w-lg mx-auto p-3 w-full'>
   <h1 className='my-7 text-center  text-3xl'>Profile</h1>
    <form  className='flex flex-col gap-4'>
    <input
      type='file'
      accept='image/*'
       onChange={handleImageChange}  
       ref={filePicker}
       hidden
    />
  <div
    className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full
      '
      onClick={()=>filePicker.current.click()}>
       
      { imageFileUploadProgress && (
        <CircularProgressbar
          value={imageFileUploadProgress || 0}
          text={`${imageFileUploadProgress}%`}
          strokeWidth={5}
          styles={{
            root: {
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            },
            path: {
              stroke: `rgba(62, 152, 199, ${
                imageFileUploadProgress / 100
              })`,
            },
          }}
        />
      )}

   
    <img
      src={ imagefileUrl || currentUser.profilePicture}
      alt='user'
      className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
        
     
    />
  </div>
  {
    imageFileUploadError && (
    <Alert color='failure'>{imageFileUploadError}
    </Alert>)
  }
 
  <TextInput
    type='text'
    id='userName'
    placeholder='username'
    defaultValue={currentUser.userName}
    
  />
  <TextInput
    type='email'
    id='email'
    placeholder='email'
    defaultValue={currentUser.email}
   
  />
  <TextInput
    type='password'
    id='password'
    placeholder='password'
    
  />
  <Button
    type='submit'
    gradientDuoTone='purpleToBlue'
    outline
  
  >
    Update
  </Button>
  
   
     
      
  
</form>
<div className='text-red-500 flex justify-between mt-5'>
  <span className='cursor-pointer'>
    Delete Account
  </span>
  <span  className='cursor-pointer'>
      Logout
  </span>
</div>
</div>
  )
}
