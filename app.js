const express = require("express");
const app = express();
const PORT = 3002;

app.use(express.json());

const usuarioRouter = require("./router/usuario_router.js");
app.use("/api/usuarios", usuarioRouter);

const genderRouter = require("./router/gender_router.js");
app.use("/api/gender", genderRouter);

// Tratamento de erro, com rota não encontrada
app.use((req, res) => {
  res.status(404).send("Rota não encontrada");
});

// Inicial no terminal
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
