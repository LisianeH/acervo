const express = require("express");
const app = express();
const PORT = 3002;

app.use(express.json());

const filmeRouter = require("./router/filme_router.js");

app.use("/api/filmes", filmeRouter);

// Tratamento de erro, com rota não encontrada
app.use((req, res) => {
  res.status(404).send("Rota não encontrada");
});

// Inicial no terminal
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
