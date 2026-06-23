const express = require("express");
const app = express();
const PORT = 3002;
const REQUEST_MAPPING = "/api/";

app.use(express.json());

const userRouter = require("./router/user_router.js");
const authorRouter = require("./router/author_router.js");
const genderRouter = require("./router/gender_router.js");

app.use(REQUEST_MAPPING + "users", userRouter);
app.use(REQUEST_MAPPING + "authors", authorRouter);
app.use(REQUEST_MAPPING + "genders", genderRouter);

// Tratamento de erro, com rota não encontrada
app.use((req, res) => {
  res.status(404).send("Rota não encontrada");
});

// Inicial no terminal
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
