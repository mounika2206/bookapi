const Router = require("express").Router();

const AuthorModel = require("../../database/author");
const BookModel=require("../../database/book")


/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });
});
//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-

/*
  Route           /author
  Description     get a list of authors based on a book's ISBN
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
  Router.get("/:isbn", async (req, res) => {
    try {
      const getSpecificAuthors = database.authors.filter((author) =>
        author.books.includes(req.params.isbn)
      );
  
      if (getSpecificAuthors.length === 0) {
        return res.json({
          error: `No author found for the book ${req.params.isbn}`,
        });
      }
  
      return res.json({ authors: getSpecificAuthors });
    } catch (error) {
      return res.json({ error: error.message });
    }
  });

//------------------------------------------------------------------
//----------------------------------------------------------------------

  Router.get("/:isbn", async (req, res) => {
    try{
    const getSpecificAuthors = await AuthorModel.find({
      books: { $all: [req.params.isbn] },
    });
  
    if (!getSpecificAuthors) {
      return res.json({
        error: `No author found for the book ${req.params.isbn}`,
      });
    }
    return res.json({ author: getSpecificAuthors });
  
    }catch(error){
      res.json({error : error})
    }
  });

//-------------------------------------------------------------------
//--------------------------------------------------------------------
//----------------------------------------------------------------------
/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", (req, res) => {
  const { newAuthor } = req.body;

  AuthorModel.create(newAuthor);

  return res.json({ message: "author was added!" });
});

//-------------------------------------------------------------------
//--------------------------------------------------------------------



/*
  Route           /author/id
  Description     get specific author based on a id
  Access          PUBLIC
  Parameters      id
  Method          GET
  */
  Router.get("/id/:id", async (req, res) => {
    try{
    const getSpecificAuthor = AuhtorModel.findOne({
      id: parseInt(req.params.id),
    });
    if (!getSpecificAuthor) {
      return res.json({
        error: `No author found for the id : ${req.params.id}`,
      });
    }
    return res.json({ author: getSpecificAuthor });
  
    }catch(error){
      res.json({error : error})
    }
  });


//-------------------------------------------------------------------
//---------------------------------------------------------------------
  /*
Route           /authpr/delete
Description     delete a author
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
Router.delete("/delete/:author", async (req, res) => {
  const updatedBookDatabase = await AuthorModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });
  return res.json({ books: updatedBookDatabase });
});

//-------------------------------------------------------------------
//-------------------------------------------------------------------

/*
Route           /author/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
Router.put("/update/name/:id/:name", async(req, res) => {
  try{
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id : req.params.id,
        },
        {
            name : req.params.name,
        },
        {
            new : true
        }
    )
    res.json({ author: updatedAuthor });

    }catch(error){
      res.json({error : error})
    }
  });

//_______________________________________________________________________
//-----------------------------------------------------------------------
//______________________________________________________________________-


  /*
Route           /author/delete/
Description     delete a author from a book
Access          PUBLIC
Parameters       author id
Method          DELETE
*/
Router.delete("/delete/:id", async (req, res) => {
  try{
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
          id : req.params.id,
        }
    )
    await BookModel.findOneAndDelete(
      {
        author : req.params.id,
      }
    )
    return res.json({ author: updatedAuthorDatabase });
  }
  catch(error){
    res.json({error : error})
  }
})




  
module.exports = Router;

