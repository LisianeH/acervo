const bookService = require("../service/book_service.js");

async function insertBook(req, res) {
  try {
    const bookJson = req.body;
    const userId = req.user.id;
    const role = req.user.role;
    const result = await bookService.insertBook(bookJson, userId, role);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function listBooks(req, res) {
  try {
    const title = req.query.name;
    const myOnly = req.query.my !== undefined;
    const userId = req.user.id;
    const role = req.user.role;

    const result = await bookService.listBooks(title, userId, myOnly, role);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function updateBook(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;
    const userId = req.user.id;
    const role = req.user.role;
    await bookService.updateBook(id, entity, userId, role);
    res.send();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;
    await bookService.deleteBook(id, userId, role);
    res.status(200).json({
      message: "Livro deletado com sucesso.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  insertBook,
  listBooks,
  updateBook,
  deleteBook,
};
