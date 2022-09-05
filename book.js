'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/books' , {useNewUrlParser :true,
useUnifiedTopology:true });



const bookSchema = new mongoose.Schema({
  title: String,
  description:String,
  states:String,
});

const Book = mongoose.model('books', bookSchema);


async function seedData (){
const firstBook = new Book({
title : "Girl, Forgotten ",
description:"U.S. Marshal Andrea Oliver goes to Longbill Beach to protect a judge and winds up investigating a cold case from 1982.",
states:"Available"


})
const secondBook = new Book({
  title : "Babel ",
  description:"In 1828, Robin Swift studies at Oxford University’s Royal Institute of Translation and faces a choice when Britain pursues a war with China.",
  states:"Available"
  
  
  })
  const thirdBook = new Book({
    title : "I'm Glad My Mom Died",
    description:"The actress and filmmaker describes her eating disorders and difficult relationship with her mother.",
    states:"Available"
    
    
    })
    
    await  firstBook.save();
    await  secondBook.save();
    await  thirdBook.save();





}
// seedData();


app.get('/Books', getTheBestBooks );



function getTheBestBooks(req,res){
  Book.find({},(err,result) =>{
    if(err){
      console.log(err)
    }
    else 
    {
      res.send(result)
    }
  })



}





app.get('/', (request, response) => {

  response.send('test request received')

})
