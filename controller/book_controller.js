const bookService = require("../service/book_service.js");

async function insertBook(req, res) {
  try {
    const bookJson = req.body;
    const result = await bookService.insertBook(bookJson);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function listBooks(req, res) {
  const result = await bookService.listBooks();
  res.status(200).json(result);
}

async function listById(req, res) {
  try {
    const id = req.params.id;
    const result = await bookService.listById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateBook(req, res) {
  try {
    const id = req.params.id;
    const entity = req.body;
    await bookService.updateBook(id, entity);
    res.send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    await bookService.deleteBook(id);
    res.send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  insertBook,
  listBooks,
  listById,
  updateBook,
  deleteBook,
};
