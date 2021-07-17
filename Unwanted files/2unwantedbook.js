const Router = require("express").Router();

const AuthorModel = require("../database/author");

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

/*
Route           /author/delete/
Description     delete a author from a book
Access          PUBLIC
Parameters       author id
Method          DELETE
*/
Router.delete("/delete/:id", (req, res) => {
  const updatedAuthorDatabase = database.author.filter(
    (author) => author.id !== parseInt(req.params.id)
  );

  database.auhtor = updatedAuthorDatabase;
  return res.json({ author: updatedAuthorDatabase });
});




/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
Router.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.authors.filter(
        (author) => author !== parseInt(req.params.authorId)
      );
      book.authors = newAuthorList;
      return;
    }
  });

  // update the author database
  database.authors.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      const newBooksList = author.books.filter(
        (book) => book !== req.params.isbn
      );

      author.books = newBooksList;
      return;
    }
  });

  return res.json({
    message: "author was deleted!!!!!!😪",
    book: database.books,
    author: database.authors,
  });
});





/*
Route           /author/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
Router.put("/update/name/:id/:name", (req, res) => {
  database.author.forEach((auhtor) => {
    if (auhtor.id === parseInt(req.params.id)) {
      return (auhtor.name = req.params.name);
    }
  });
  res.json({ author: database.author });
});


module.exports = Router;

// syntax was correct
// logica error -> we were not handling errors -> crashed
// try catch



















const Router = require("express").Router();

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", (req, res) => {
  return res.json({ publications: database.publications });
});

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

module.exports = Router;






















const Router = require("express").Router();

const AuthorModel = require("../database/author");

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

module.exports = Router;

// syntax was correct
// logica error -> we were not handling errors -> crashed
// try catch

































const Router = require("express").Router();

//const AuthorModel = require("../../database/author");
//const BookModel = require("../../database/books");


// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
  try{
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });

  }catch(error){
    res.json({error : error})
  }
});
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
/*
  Route           /author
  Description     get lsit authors based on a book isbn
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
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

// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
  try{
  const { newAuthor } = req.body;
  await AuthorModel.create(newAuthor);
  
  return res.json({ author: newAuthor });
  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
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
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
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






// Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../database/book");

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Router.get("/is/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/
Router.get("/c/:category", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});







Router.get("/author/:id", async(req, res) => {
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



/*
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", async (req, res) => {
  try {
    const { newBook } = req.body;

    await BookModel.create(newBook);

    return res.json({ message: "book was added!" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/*
Route           /book/update
Description     update title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true, // to get updated data
    }
  );

  // database.books.forEach((book) => {
  //   if (book.ISBN === req.params.isbn) {
  //     book.title = req.body.bookTitle;
  //     return;
  //   }
  // });

  return res.json({ books: updatedBook });
});

/*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/author/update/:isbn", async (req, res) => {
  // update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  // database.books.forEach((book) => {
  //   if (book.ISBN === req.params.isbn)
  //     return book.authors.push(req.body.newAuthor);
  // });

  // update the author database

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );

  // database.authors.forEach((author) => {
  //   if (author.id === req.body.newAuthor)
  //     return author.books.push(req.params.isbn);
  // });

  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    message: "New author was added ",
  });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
Router.delete("/delete/:isbn", async (req, res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });

  // const updatedBookDatabase = database.books.filter(
  //   (book) => book.ISBN !== req.params.isbn
  // );

  // database.books = updatedBookDatabase;
  return res.json({ books: updatedBookDatabase });
});

/*
  Route           /book/delete/author
  Description     delete a author from a book
  Access          PUBLIC
  Parameters      isbn, author id
  Method          DELETE
  */
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
  // update the book database

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        authors: parseInt(req.params.authorId),
      },
    },
    { new: true }
  );

  // database.books.forEach((book) => {
  //   if (book.ISBN === req.params.isbn) {
  //     const newAuthorList = book.authors.filter(
  //       (author) => author !== parseInt(req.params.authorId)
  //     );
  //     book.authors = newAuthorList;
  //     return;
  //   }
  // });

  // update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(req.params.authorId),
    },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );
  // database.authors.forEach((author) => {
  //   if (author.id === parseInt(req.params.authorId)) {
  //     const newBooksList = author.books.filter(
  //       (book) => book !== req.params.isbn
  //     );

  //     author.books = newBooksList;
  //     return;
  //   }
  // });

  return res.json({
    message: "author was deleted!!!!!!",
    book: updatedBook,
    author: updatedAuthor,
  });
});

module.exports = Router;





















const Router = require("express").Router();

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json({ publications: getAllPublications });
});
/*Router.get("/", (req, res) => {
  return res.json({ publications: database.publications });
});*/

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

module.exports = Router;


























const Router = require("express").Router();

//const BookModel = require("../../database/book");

// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
  try{
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /is
  Description     get a specific book based on isbn
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
Router.get("/is/:isbn", async (req, res) => {
  try{
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({ books: getSpecificBook });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /c
  Description     get specific books based on a category
  Access          PUBLIC
  Parameters      category
  Method          GET
  */
Router.get("/c/:category", async (req, res) => {
  try{
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }
  return res.json({ books: getSpecificBooks });


  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /lang
  Description     get specific books based on a language
  Access          PUBLIC
  Parameters      lang
  Method          GET
  */
Router.get("/lang/:lang", async (req, res) => {
  try{
  const getSpecificBooks = await BookModel.findOne({ language: req.params.id });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the language of ${req.params.lang}`,
    });
  }

  return res.json({ books: getSpecificBooks });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /book/author/
  Description     get specific books based on a author id
  Access          PUBLIC
  Parameters      id
  Method          GET
  */
Router.get("/author/:id", async (req, res) => {
  try{
  const authorId = req.params.id;
  const getSpecificBook = await BookModel.findOne({
    author: { $all: [authorId] },
  });

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the author of id : ${req.params.id}`,
    });
  }

  return res.json({ books: getSpecificBook });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
  try{
  const { newBook } = req.body;
  BookModel.create(newBook);
  return res.json({ books: newBook });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /book/update/title
Description     update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {
  try{
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.newBookTitle,
    },
    {
      new: true,
    }
  );

  res.json({ books: updatedBook });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /book/update/author
  Description     update book author
  Access          PUBLIC
  Parameter       isbn
  Methods         PUT
  */
Router.put("/update/author/:isbn", async (req, res) => {
  try{
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        author: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );
  res.json({ books: updatedBook, author: updatedAuthor });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
Router.delete("/delete/:isbn", async (req, res) => {
  try{
  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });

  return res.json({ books: updatedBookDatabase });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /book/delete/author
  Description     delete a author from a book
  Access          PUBLIC
  Parameters      isbn, author id
  Method          DELETE
  */
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
  try{
  // update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        author: parseInt(req.params.authorId),
      },
    },
    {
      new: true,
    }
  );

  // update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(req.params.authorId),
    },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    message: "author was deleted!!!!!!",
    book: updatedBook,
    author: updatedAuthor,
  });

  }catch(error){
    res.json({error : error})
  }
});
module.exports = Router;
























const Router = require("express").Router();
//const PublicationModel = require("../../database/publication");
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/publications", async (req, res) => {
  try{
  const getPublications = await PublicationModel.find();
  return res.json({ publications: getPublications });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /publications/id
  Description     get specific publication based on a id
  Access          PUBLIC
  Parameters      id
  Method          GET
  */
Router.get("/publications/id/:id", async (req, res) => {
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
/*
  Route           /publication/book
  Description     get lsit publication based on a book isbn
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
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
  try{
  const { newPublication } = req.body;
  await PublicationModel.create(newPublication);
  return res.json({ publications: newPublication });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
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
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
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
module.exports = Router;