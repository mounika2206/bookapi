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
  
  
  
  
  module.exports = Router;  