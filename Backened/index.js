import express from "express";
import mongoose from "mongoose"
import {app} from './app.js'
import dotenv  from 'dotenv'
import dataConnected from './db/dataBaseConnections.js'
dotenv.config();
import path from 'path';

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));
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
      app.listen(process.env.PORT || 3000, () => {
          console.log(`server is running on this port: ${process.env.PORT}`)
      })
  })
.catch((err)=>{
   console.log('somethings went wrongs ');
})

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
 });