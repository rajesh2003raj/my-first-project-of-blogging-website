import {useSelector} from 'react-redux'
import {Alert, Button, TextInput} from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
 import {app} from '../Firebase'
 import {updateSuccess,updateStart,updateFailure,deleteStart,deleteSuccess,detelteFailure,signoutSuccess} from '../redux/store/user/userSlice'
 import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
 import { useDispatch } from 'react-redux'
 import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal } from 'flowbite-react'
export default function DashProfile() {
     
    const filePicker=useRef()
    const dispatch=useDispatch();
    const {currentUser,loading ,error}=useSelector((state)=> state.user);
    const [imageFile ,setimageFile]=useState(null);
    const [imagefileUrl,setimagefileUrl]=useState(null);
    const [imageFileUploadProgress,setimageFileUploadProgress]=useState(false);
    const [imageFileUploadError,setimageFileUploadError]=useState(null);
    const[formData,setformData]=useState({});
       
      const [updateUserError,setupdateUserError]=useState(null); 
      const[imageFileUploading,setimageFileUploading]=useState(false);
      const[updateUserSuccess,setupdateUserSuccess]=useState(null);
        const[showModal,setshowModal]=useState(false);
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
      
      
     const handleChange=(e)=>{
        setformData({...formData, [e.target.id]: e.target.value});
     }
      
    



      const uploadImage = async () => {  

         setimageFileUploadError(null);
         setimageFileUploading(true)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
      
        // Attach event listeners for upload progress, error, and completion
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimageFileUploadProgress(progress.toFixed(0));
        }, (error) => {
          setimageFileUploadError('could not upload  file must be less than 2 MB');
           
           setimageFileUploadProgress(null)
           setimageFile(null)
           setimagefileUrl(null)
           setimageFileUploading(false)

          
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimagefileUrl(downloadURL);
              setformData({...formData,profilePicture:downloadURL})
              setimageFileUploading(false)
          });
        });
        
      };
       console.log(formData);
      const handleUpdate= async(e)=>{
        // first we have verfiy that data should not empty for that we have to check 
         e.preventDefault();
         {/*   here we do this because of set it null again  if previous value is not null then it becomes  null it */}
             setupdateUserError(null);
           setupdateUserSuccess(null);
           {/* check it value should not be null */}
           if(Object.keys(formData).length==0){
             
              setupdateUserError('no made change ')
            return;
           }
     {/*   when image is uploading we cannot do anythings so that we use it here  */}
           if(imageFileUploading){
             setupdateUserError('image is uploading ....')
            return;
           }
        

           try {
               dispatch(updateStart())
              const res=await fetch(`/api/v1/update/${currentUser._id}`,{
                   method:'PUT',
                   headers:{
                    'content-Type': 'application/json',
                   },
                   body:JSON.stringify(formData)
                

              });
              const data = await  res.json();
              if(!res.ok){
                   dispatch(updateFailure(data.message));

              }
              else{
                  dispatch(updateSuccess(data))
                  setupdateUserSuccess(`user's update successfully`)
              }  
           } catch (error) {
               dispatch(updateFailure(error.message))
           }

      }
       
      const handleDeleteUser=async()=>{

       setshowModal(false);
       try {
           dispatch(deleteStart());
         const res= await fetch(`/api/v1/delete/${currentUser._id}`,{
           method:'DELETE',
         })
         const data= await res.json();
         if(!res.ok){
            dispatch(detelteFailure(data.message))
         }
         else{
            dispatch(deleteSuccess(data))
         }
       } catch (error) {
          dispatch(detelteFailure(error.message));
       }
      }

      const handleSignout=async()=>{
            
        try {
              const res= await fetch('/api/v1/signout',{
                method:'POST'
              });

          const data=  await res.json();
          if(!res.ok){
             console.log(data.message)
          } 
          else{
            dispatch(signoutSuccess(data))
          }
              
        } catch (error) {
             console.log(error.message)
        }
      }

  return (
     
     
    <div className='max-w-lg mx-auto p-3 w-full'>
   <h1 className='my-7 text-center  text-3xl'>Profile</h1>
    <form 
     onSubmit={handleUpdate}
    className='flex flex-col gap-4'>
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
      src= { imagefileUrl || currentUser.profilePicture}
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
    onChange={handleChange}
    
  />
  <TextInput
    type='email'
    id='email'
    placeholder='email'
    defaultValue={currentUser.email}
    onChange={handleChange}
   
  />
  <TextInput
    type='password'
    id='password'
    placeholder='password'
    onChange={handleChange}
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
  <span   onClick={()=> setshowModal(true)}     className='cursor-pointer'>
    Delete Account
  </span>
  <span onClick={ handleSignout} className='cursor-pointer'>
      Logout
  </span>
</div>
{
  updateUserSuccess && 
  <Alert
    color='success'
    className='mt-5'
    
  >{updateUserSuccess}
  </Alert>
}
{
  updateUserError && 
  <Alert
     color= 'failure'
      className='mt-5'
     >
    {updateUserError}
  </Alert>
}
{
   error  && 
  <Alert
     color= 'failure'
      className='mt-5'
     >
    {error}
  </Alert>
}
 <Modal
    show={showModal}
    onClose={()=> setshowModal(false)}
    popup
    size='md'
 >
 <Modal.Header />
 <Modal.Body>
       <div className='text-center'>
       <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
       <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
         Are you sure you want to delete your account?
       </h3>
       <div className='flex justify-center gap-4'>
         <Button color='failure' onClick={handleDeleteUser}>
           Yes, I'm sure
         </Button>
         <Button color='gray' onClick={() => setshowModal(false)}>
           No, cancel
         </Button>
       </div>
     </div>
 
 </Modal.Body>


 </Modal>
</div>
  )
}
