const repository = require("../repository/book_repository.js");
const relational = require("../repository/book_log_repository.js");

async function insertBook(entityJson, userId, role) {
  if (role === "ADMIN") {
    return await repository.insertBook(entityJson);
  } else if (role === "USER") {
    const allowedFields = ["book", "status", "note"];
    const forbiddenFields = ["title", "author", "gender", "year_publication", "page_numbers"];
    const providedFields = Object.keys(entityJson);
    
    const hasForbidenFields = providedFields.some(field => forbiddenFields.includes(field));
    if (hasForbidenFields) {
      const error = new Error(
        "Dados inconsistentes. Envie: {book, status, note}."
      );
      error.status = 400;
      throw error;
    }
    
    if (!entityJson.book) {
      const error = new Error(
        "Dados inconsistentes. Campo obrigatório faltando: 'book' (ID do livro que deseja rastrear)."
      );
      error.status = 400;
      throw error;
    }
    
    const allowedStatus = ["A_LER", "LENDO", "CONCLUIDO"];
    if (!allowedStatus.includes(entityJson.status)) {
      const error = new Error(
        `Status inválido. Use: ${allowedStatus.join(", ")}.`
      );
      error.status = 400;
      throw error;
    }
    if (entityJson.note !== undefined) {
      if (isNaN(entityJson.note)) {
        const error = new Error("Nota inválida.");
        error.status = 400;
        throw error;
      }

      if (Number(entityJson.note) < 0.1 || Number(entityJson.note) > 5.0) {
        const error = new Error("A nota deve estar entre 0.1 e 5.0.");
        error.status = 400;
        throw error;
      }
    }

    return await relational.insertReadingLog({
      the_user: userId,
      book: entityJson.book,
      status: entityJson.status,
      note: entityJson.note,
    });
  }
}

async function listBooks(title = null, userId, myOnly = false, role) {
  if (myOnly) {
    return await relational.listByUser(title, userId);
  }
  if (title) {
    return await repository.listBooksByTitle(title);
  }
  return await repository.listBooks();
}

async function listById(id) {
  return await repository.findById(id);
}

async function updateBook(id, entity, userId, role) {
  if (role === "ADMIN") {
    await repository.updateBook(id, entity);
  } else if (role === "USER") {
    const allowedFields = ["status"];
    const forbiddenFields = ["title", "author", "gender", "year_publication", "page_numbers"];
    const providedFields = Object.keys(entity);
    
    const hasForbidenFields = providedFields.some(field => forbiddenFields.includes(field));
    if (hasForbidenFields) {
      const error = new Error(
        "Dados inconsistentes. Pode atualizar: {status, note}."
      );
      error.status = 400;
      throw error;
    }
    
    const allowedStatus = ["A_LER", "LENDO", "CONCLUIDO"];
    if (!allowedStatus.includes(entity.status)) {
      const error = new Error(
        `Status inválido. Use: ${allowedStatus.join(", ")}.`
      );
      error.status = 400;
      throw error;
    }
    await relational.updateReadingLog(id, userId, entity);
  }
}

async function deleteBook(id, userId, role) {
  if (role === "ADMIN") {
    const count = await relational.countByBook(id);
    if (count > 0) {
      const error = new Error(
        `Não é possível deletar este livro. ${count} usuário(s) está/estão rastreando-o.`
      );
      error.status = 400;
      throw error;
    }
    await repository.deleteBook(id);
  } else if (role === "USER") {
    await relational.deleteReadingLog(id, userId);
  }
}

module.exports = {
  insertBook,
  listBooks,
  listById,
  updateBook,
  deleteBook,
};
