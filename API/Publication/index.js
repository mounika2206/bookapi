const Router = require("express").Router();

const PublicationModel = require("../../database/publication");
const BookModel=require("../../database/book");


/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
/*Router.get("/", (req, res) => {
  return res.json({ publications: database.publications });
});*/


Router.get("/", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json({ authors: getAllPublications });
});

//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-


/*
  Route           /publication/update/book
  Description     update/add new book to a publication
  Access          PUBLIC
  Parameters      isbn
  Method          PUT
  */
Router.put("/update/book/:isbn", (req, res) => {
  // update the publication database
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
    message: "Successfully updated publication",
  });
});


//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-


/* 
Route            /publications
Discription      Get specific publications
Access           Public
Parameter        publications
Method           GET
*/
Router.get("/:name", async (req, res) => {
  try {
   const getSpecificPublication = await PublicationModel.findOne({name: req.params.name});

   if (!getSpecificPublication) {
       return res.json({error:`No book found for the publication of ${req.params.name}`,});
   }

   return res.json({publication: getSpecificPublication});
  } catch (error) {
      return res.json({error: error.message});
  }
});

/*
Route           /author/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", (req, res) => {
  const { newPublication } = req.body;

  PublicationModel.create(newPublication);

  return res.json({ message: "Publication was added!" });
});



//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-


/*
  Route           /publication/delete/book
  Description     delete a book from publication 
  Access          PUBLIC
  Parameters      isbn, publication id
  Method          DELETE
  */
Router.delete("/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });

  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
  });
});


//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-


/*
  Route           /publications/id
  Description     get specific publication based on a id
  Access          PUBLIC
  Parameters      id
  Method          GET
  */
  Router.get("/id/:id", async (req, res) => {
    try{
    const getSpecificPublication = await PublicationModel.findOne({
      id: parseInt(req.params.id),
    });
    if (!getSpecificPublication) {
      return res.json({
        error: `No author found for the id : ${req.params.id}`,
      });
    }
    return res.json({ author: getSpecificPublication });
  
    }catch(error){
      res.json({error : error})
    }
  });


//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-


  /*
  Route           /publication/book
  Description     get list publication based on a book isbn
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
Router.get("/book/:isbn", async (req, res) => {
  try{
  const getSpecificPublication = await PublicationModel.find({
    books: { $all: [req.params.isbn] },
  });

  if (!getSpecificPublication) {
    return res.json({
      error: `No publication found for the book ${req.params.isbn}`,
    });
  }
  return res.json({ author: getSpecificPublication });

  }catch(error){
    res.json({error : error})
  }
});


//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-


/*
Route           /publication/delete/book
Description     delete  publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
Router.delete("/delete/:pubId", async (req, res) => {
  
  try{
  const updatedPublication = await PublicationModel.findOneAndDelete({
    id: req.params.pubId,
  });
  return res.json({
    publication: updatedPublication,
  });


  }catch(error){
    res.json({error : error})
  }
});


//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-



/*
Route           /publication/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
Router.put("/update/name/:id/:name", async (req, res) => {
  try{
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
      id: req.params.id,
    },
    {
      name: req.params.name,
    },
    {
      new: true,
    }
  );
  res.json({ publications: updatedPublication });

  }catch(error){
    res.json({error : error})
  }
});











module.exports = Router;






