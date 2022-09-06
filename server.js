'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const mongoose = require('mongoose');
app.use(express.json());


// process.env.MONGODP ||process.env.MONGOCLOUD


mongoose.connect('mongodb+srv://booksshop:zAvbMMC3rWjWV2Bm@cluster0.vgldg9x.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB

const BooksSchema = new mongoose.Schema({
  title:String,
  description:String,
  status:String

});


const Book = mongoose.model('Book', BooksSchema);




// seedData();



app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/books',BooksHandler)
app.post('/addbook',NewBookHandler)
app.delete('/deletebook/:id',deleteCatHandler);
app.put('/updatebook/:id',UpdateBookHandler)


async function UpdateBookHandler(req,res){

  const bookId=req.params.id;
  console.log(bookId)
  const updatedData=req.body;
  Book.findByIdAndUpdate(updatedData.id,{
    title:updatedData.title,
    description:updatedData.description

  },(err,result)=>{
    
    if (err) {

      console.log(err)
    }  

    else{

      Book.find({},(err,result)=>{

        if (err){

          console.log(err)
        }
        else{

          res.send(result)
        }

      })
    }
  })


  

  



}

function deleteCatHandler(req,res) {
  const bookid= req.params.id;

  Book.deleteOne({_id:bookid},(err,result)=>{
    
    
    
    Book.find({},(err,result)=>{

      if (err){
        console.log(err)
      }
      else{
        res.send(result);
        
      };
    })
    
  }
    
    )
  

}


async function NewBookHandler(req,res){

    const receivedData =req.body;
    
    await Book.create({

      title:receivedData.title,
      description:receivedData.description,
      status:receivedData.status
    })

    Book.find({},(err,result)=>{

      if (err){
        console.log(err)
      }
      else{
        res.send(result);
        
      };
    })

  };



function BooksHandler(req,res){



   Book.find({},(err,result)=>{

    if (err){
      console.log(err)
    }
    else{
      res.send(result);
      
    };
 
})

}





app.listen(PORT, () => console.log(`listening on ${PORT}`));