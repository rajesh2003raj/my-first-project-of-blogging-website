import mongoose from "mongoose"
 
const dataBase= async()=>{
  

    try{
     const databaseConnection= await mongoose.connect(`${process.env.MONGO}`)
  
      console.log('Mongo DB is connected Successfully!');
     }
     catch(e){
       console.log('something went wrong !');
     }
   
     
}
export  default dataBase