const express = require("express");
const app = express();
const PORT = 3002;
const REQUEST_MAPPING = "/api/";
const loginController = require("./controller/login_controller.js");
const authMiddleware = require("./middleware/auth_middleware");

const userRouter = require("./router/user_router.js");
const authorRouter = require("./router/author_router.js");
const genderRouter = require("./router/gender_router.js");
const streamRouter = require("./router/stream_router.js");
const seriesRouter = require("./router/serie_router.js");
const filmRouter = require("./router/film_router.js");
const bookRouter = require("./router/book_router.js");

app.use(express.json());

app.post(REQUEST_MAPPING + "login", loginController.validateLogin);

app.use(authMiddleware.verifyAcesso);

app.use(REQUEST_MAPPING + "users", userRouter);
app.use(REQUEST_MAPPING + "authors", authorRouter);
app.use(REQUEST_MAPPING + "genders", genderRouter);
app.use(REQUEST_MAPPING + "streams", streamRouter);
app.use(REQUEST_MAPPING + "series", seriesRouter);
app.use(REQUEST_MAPPING + "films", filmRouter);
app.use(REQUEST_MAPPING + "books", bookRouter);

// Tratamento de erro, com rota não encontrada
app.use((req, res) => {
  res.status(404).send("Rota não encontrada");
});

// Inicial no terminal
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
