require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");

// Database
const database = require("../database/index");

const BookModel=require("../database/book");
const AuthorModel=require("../database/author");
const PublicationModel=require("./database/publications");

// Initializing express
const shapeAI = express();

shapeAI.use(express.json());
mongoose.connect(process.env.MONGO_URL,{

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}
).then(()=>console.log("connection established!!!"));

// Configurations
shapeAI.use(express.json());

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/", async(req, res) => {
  const getAllBooks= await BookModel.find();
  console.log(getAllBooks);
  return res.json(getAllBooks );
});

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/is/:isbn",async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn});
  
  
  
  
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});
/*
Route           /c
Description     get specific books based on a author name
Access          PUBLIC
Parameters      category
Method          GET
*/



shapeAI.get("/authors/name/:name", (req, res) => {
  const getSpecificAuthor = database.authors.filter(
    (author) => author.name === req.params.name
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Publication found of name ${req.params.name}`,
    });
  }

  return res.json({ author: getSpecificAuthor });
});

/*
Route           /c
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/
shapeAI.get("/c/:category",async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({category:req.params,category, });
//database.books.filter((book) =>
    //book.category.includes(req.params.category)
  //);

  if (!getSpecificBooks.length) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});


// specific book based on language

shapeAI.get("/lan/:language", (req, res) => {
  const getSpecificBooks = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );

  if (getSpecificBooks.length === 0) {
    return res.json({
      error: `No book found for the language  of ${req.params.language}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});

//get specific books based on author id

shapeAI.get("/book/author/:id", (req, res) => {
  const getSpecificBook = database.books.filter(
    (books) =>books.authors.includes(parseInt(req.params.id))
  )

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for author id ${req.params.id}`,
    });
  }

  return res.json({ author: getSpecificBook });
});


shapeAI.get("/book/author/:id", async(req, res) => {
  const getSpecificBook = await BookModel.findOne({
    id:req.params.id,
  });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for author id ${req.params.id}`,
    });
  }

  return res.json({ author: getSpecificBook });
});




shapeAI.listen(3300,()=>console.log("server running!"));