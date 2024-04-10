import express from "express";
import mongoose from "mongoose"
import {app} from './app.js'
import dotenv  from 'dotenv'
import dataConnected from './db/dataBaseConnections.js'
dotenv.config();
/*
mongoose.connect(process.env.MONGO)
.then(()=>{
   console.log('successfully connected')
   app.listen(process.env.PORT || 8000,()=>{
       console.log(`server is running on this port:${process.env.PORT}`);
   })
})
.catch((err)=>{
   console.log('not connected successfully!');
})*/
// it return promise so we apply then and catch
dataConnected()

   .then(() => {
      app.listen(process.env.PORT || 8000, () => {
          console.log(`server is running on this port: ${process.env.PORT}`)
      })
  })
.catch((err)=>{
   console.log('somethings went wrongs ',err);
})