# Acervo

API REST para organizar um acervo pessoal de livros, filmes e séries. O projeto permite que administradores cadastrem os itens base do catálogo e que usuários comuns montem sua própria lista de leitura, filmes e séries, registrando status, temporada e avaliações.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- JWT para autenticação
- bcrypt para criptografia de senha
- pg para conexão com o banco

## Como Executar

Pré-requisitos:

- Node.js instalado.
- PostgreSQL instalado e rodando.
- Banco de dados `crud_acervo` criado.

Passo a passo:

1. Instale as dependências:

```bash
npm install
```

2. Crie o banco PostgreSQL:

```sql
CREATE DATABASE crud_acervo;
```

3. Execute o script SQL disponível em:

```text
database/db/script.txt
```

4. Confira se a conexão do banco está correta em:

```text
database/database.js
```

Configuração atual:

```js
host: "localhost"
port: 5432
user: "postgres"
password: "postgre"
database: "crud_acervo"
```

5. Inicie a API:

```bash
node app.js
```

A API ficará disponível em:

```text
http://localhost:3002/api
```

## Autenticação

A rota de login retorna um token JWT. As demais rotas precisam receber esse token no header:

```http
Authorization: Bearer SEU_TOKEN
```

O token carrega o `id`, `email` e `role` do usuário. O projeto trabalha com dois perfis:

- `ADMIN`: pode gerenciar cadastros base, como usuários, autores, gêneros, streams, livros, filmes e séries.
- `USER`: pode registrar livros, filmes e séries em seu próprio acervo pessoal.

## Estrutura do Projeto

O projeto foi organizado em camadas:

- `router`: define os endpoints HTTP.
- `controller`: recebe a requisição e chama o service.
- `service`: concentra as regras de negócio.
- `repository`: acessa o banco de dados.
- `crud_template.js`: centraliza operações genéricas de CRUD.
- `database`: guarda a configuração e o script do banco.
- `middleware`: valida token JWT e permissão de administrador.

Também foram criados repositórios relacionais para os registros pessoais dos usuários:

- `book_log_repository.js`: tabela `reading_log`.
- `film_log_repository.js`: tabela `film_registration`.
- `serie_log_repository.js`: tabela `season_log`.

## Banco de Dados

O banco representa um acervo com tabelas principais e tabelas relacionais de acompanhamento por usuário.

### Tabelas Principais

- `users`: usuários da API.
- `authors`: autores de livros.
- `gender`: gêneros/categorias.
- `streams`: plataformas de streaming.
- `books`: cadastro base dos livros.
- `films`: cadastro base dos filmes.
- `series`: cadastro base das séries.

### Tabelas Relacionais

- `reading_log`: relaciona usuário e livro, guardando o status de leitura e a avaliação.
- `film_registration`: relaciona usuário e filme, guardando status e nota.
- `season_log`: relaciona usuário e série, guardando temporada atual e status.

### Enums de Status

Livros usam `reading_status`:

- `A_LER`
- `LENDO`
- `CONCLUIDO`

Filmes usam `film_status`:

- `A_VER`
- `CONCLUIDO`

Séries usam `series_status`:

- `A_VER`
- `ASSISTINDO`
- `CONCLUIDO`

## Endpoints

Base URL:

```text
http://localhost:3002/api
```

### Login

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| POST | `/login` | Público | Autentica usuário e retorna token JWT |

Body:

```json
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

### Usuários

Rotas protegidas por `ADMIN`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/users` | Cria usuário |
| GET | `/users` | Lista usuários |
| GET | `/users/:id` | Busca usuário por ID |
| PUT | `/users/:id` | Atualiza usuário |

Body de criação:

```json
{
  "name": "Nome",
  "email": "usuario@email.com",
  "password": "senha",
  "role": "USER"
}
```

### Autores

Rotas protegidas por `ADMIN`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/authors` | Cria autor |
| GET | `/authors` | Lista autores |
| GET | `/authors?name=nome` | Filtra autores por nome |
| GET | `/authors/:name` | Busca autor por nome |
| PUT | `/authors/:id` | Atualiza autor |
| DELETE | `/authors/:id` | Remove autor |

Body:

```json
{
  "name": "Machado de Assis",
  "nationality": "Brasileira"
}
```

### Gêneros

Rotas protegidas por `ADMIN`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/genders` | Cria gênero |
| GET | `/genders` | Lista gêneros |
| GET | `/genders/:name` | Busca gênero por nome |
| PUT | `/genders/:id` | Atualiza gênero |
| DELETE | `/genders/:id` | Remove gênero |

Body:

```json
{
  "name": "Drama"
}
```

### Streams

Rotas protegidas por `ADMIN`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/streams` | Cria stream |
| GET | `/streams` | Lista streams |
| GET | `/streams/:name` | Busca stream por nome |
| PUT | `/streams/:id` | Atualiza stream |
| DELETE | `/streams/:id` | Remove stream |

Body:

```json
{
  "name": "Netflix",
  "description": "Plataforma de streaming"
}
```

### Livros

Rotas autenticadas. O comportamento muda conforme o perfil.

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| POST | `/books` | ADMIN | Cadastra livro no catálogo |
| POST | `/books` | USER | Adiciona livro ao `reading_log` do usuário |
| GET | `/books` | Autenticado | Lista livros do catálogo |
| GET | `/books?name=titulo` | Autenticado | Filtra livros por título |
| GET | `/books?my=true` | USER | Lista livros registrados pelo usuário |
| PUT | `/books/:id` | ADMIN | Atualiza livro do catálogo |
| PUT | `/books/:id` | USER | Atualiza registro pessoal do livro |
| DELETE | `/books/:id` | ADMIN | Remove livro do catálogo |
| DELETE | `/books/:id` | USER | Remove livro do acervo pessoal |

Body para `ADMIN` cadastrar livro:

```json
{
  "title": "Dom Casmurro",
  "author": 1,
  "year_publication": 1899,
  "page_numbers": 256,
  "gender": 1
}
```

Body para `USER` registrar leitura:

```json
{
  "book": 1,
  "status": "LENDO",
  "note": 4.5
}
```

### Filmes

Rotas autenticadas. O comportamento muda conforme o perfil.

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| POST | `/films` | ADMIN | Cadastra filme no catálogo |
| POST | `/films` | USER | Adiciona filme ao registro pessoal |
| GET | `/films` | Autenticado | Lista filmes do catálogo |
| GET | `/films?name=titulo` | Autenticado | Filtra filmes por título |
| GET | `/films?my=true` | USER | Lista filmes registrados pelo usuário |
| GET | `/films/:name` | Autenticado | Busca filme por nome |
| PUT | `/films/:id` | ADMIN | Atualiza filme do catálogo |
| PUT | `/films/:id` | USER | Atualiza registro pessoal do filme |
| DELETE | `/films/:id` | ADMIN | Remove filme do catálogo |
| DELETE | `/films/:id` | USER | Remove filme do registro pessoal |

Body para `ADMIN` cadastrar filme:

```json
{
  "title": "Interestelar",
  "gender": 1,
  "synopsis": "Filme de ficção científica",
  "the_cast": "Matthew McConaughey, Anne Hathaway"
}
```

Body para `USER` registrar filme:

```json
{
  "film": 1,
  "status": "CONCLUIDO",
  "note": 5.0
}
```

### Séries

Rotas autenticadas. O comportamento muda conforme o perfil.

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| POST | `/series` | ADMIN | Cadastra série no catálogo |
| POST | `/series` | USER | Adiciona série ao acompanhamento pessoal |
| GET | `/series` | Autenticado | Lista séries do catálogo |
| GET | `/series?name=titulo` | Autenticado | Filtra séries por título |
| GET | `/series?my=true` | USER | Lista séries acompanhadas pelo usuário |
| PUT | `/series/:id` | ADMIN | Atualiza série do catálogo |
| PUT | `/series/:id` | USER | Atualiza acompanhamento pessoal |
| DELETE | `/series/:id` | ADMIN | Remove série do catálogo |
| DELETE | `/series/:id` | USER | Remove série do acompanhamento pessoal |

Body para `ADMIN` cadastrar série:

```json
{
  "title": "Dark",
  "stream": 1,
  "number_seasons": 3,
  "gender": 1,
  "synopsis": "Série de suspense e ficção científica"
}
```

Body para `USER` acompanhar série:

```json
{
  "serie": 1,
  "season": 2,
  "status": "ASSISTINDO"
}
```

## Regras de Negócio

### Autenticação e Permissão

- Apenas `/api/login` é público.
- Todas as outras rotas exigem token JWT.
- Rotas de `users`, `authors`, `genders` e `streams` exigem perfil `ADMIN`.
- Livros, filmes e séries podem ser acessados por `ADMIN` e `USER`, mas com comportamentos diferentes.

### Usuários

- Senhas são criptografadas com bcrypt antes de salvar.
- Login valida e-mail e senha e retorna token JWT.
- O token expira em 1 hora.

### Livros

- `ADMIN` cadastra e gerencia livros do catálogo.
- `USER` não pode enviar campos administrativos como `title`, `author`, `gender`, `year_publication` ou `page_numbers`.
- `USER` deve informar o campo `book` para registrar um livro no `reading_log`.
- Status permitido: `A_LER`, `LENDO`, `CONCLUIDO`.
- O usuário pode avaliar o livro com `note` de `0.1` a `5.0`.
- A nota é salva no registro relacional do usuário, não no cadastro base do livro.
- Um livro não pode ser excluído por `ADMIN` se houver usuários rastreando esse livro.

### Filmes

- `ADMIN` cadastra e gerencia filmes do catálogo.
- `USER` não pode enviar campos administrativos como `title`, `gender`, `synopsis` ou `the_cast`.
- `USER` deve informar o campo `film` para registrar um filme.
- Status permitido: `A_VER`, `CONCLUIDO`.
- Quando não informado, o status padrão é `A_VER`.
- O usuário pode avaliar o filme com `note` de `0.1` a `5.0`.
- Um filme não pode ser excluído por `ADMIN` se houver usuários usando esse filme.

### Séries

- `ADMIN` cadastra e gerencia séries do catálogo.
- `USER` não pode enviar campos administrativos como `title`, `stream`, `number_seasons`, `gender` ou `synopsis`.
- `USER` deve informar o campo `serie` para acompanhar uma série.
- Status permitido: `A_VER`, `ASSISTINDO`, `CONCLUIDO`.
- Quando não informado, o status padrão é `A_VER`.
- Quando não informada, a temporada padrão é `1`.
- A temporada deve ser numérica e maior ou igual a `1`.
- A temporada informada não pode ser maior que o total de temporadas cadastrado para a série.
- Uma série não pode ser excluída por `ADMIN` se houver usuários usando essa série.

## Observações

- A API usa o padrão Controller, Service e Repository.
- O `CrudTemplate` centraliza as operações SQL genéricas.
- Os métodos `updateWithQualify` e `deleteWithQualify` atualizam/removem registros relacionais considerando o usuário autenticado e a coluna do item (`book`, `film` ou `serie`).
- Para notas decimais, o ideal é que as colunas `note` no banco usem um tipo numérico adequado, como `NUMERIC(2,1)` ou `DECIMAL(2,1)`.
