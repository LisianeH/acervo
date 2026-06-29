const express = require("express");
const app = express();
const PORT = 3002;
const REQUEST_MAPPING = "/api/";
const loginController = require("./controller/login_controller.js");
const authMiddleware = require("./middleware/auth_middleware");
const verifyAdminRole = require("./middleware/role_middleware.js");

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

app.use(REQUEST_MAPPING + "users", verifyAdminRole, userRouter);
app.use(REQUEST_MAPPING + "authors", verifyAdminRole, authorRouter);
app.use(REQUEST_MAPPING + "genders", verifyAdminRole, genderRouter);
app.use(REQUEST_MAPPING + "streams", verifyAdminRole, streamRouter);
app.use(REQUEST_MAPPING + "series", verifyAdminRole, seriesRouter);
app.use(REQUEST_MAPPING + "films", verifyAdminRole, filmRouter);
app.use(REQUEST_MAPPING + "books", verifyAdminRole, bookRouter);

// Tratamento de erro, com rota não encontrada
app.use((req, res) => {
  res.status(404).send("Rota não encontrada");
});

// Inicial no terminal
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
