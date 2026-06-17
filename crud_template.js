const pool = require("./database/database.js");
const { listAuthors } = require("./service/author_service.js");

class CrudTemplate {
  #table;

  constructor(table) {
    this.#table = table;
  }

  async insert(entityJson) {
    try {
      const fields = Object.keys(entityJson).join(", ");

      const values = Object.values(entityJson);

      const placeholders = Array.from(
        { length: values.length },
        (element, index) => `$${Number(index + 1)}`,
      ).join(",");

      const query = `INSERT INTO ${this.#table} (${fields}) VALUES (${placeholders}) RETURNING *`;

      const result = await pool.query(query, values);

      return result.rows[0];
    } catch (error) {
      throw new Error(`an error was ocurred: ${table} - ${error.message}`);
    }
  }

  async list() {
    const query = `SELECT * FROM ${this.#table}`;
    const result = await pool.query(query);

    return result.rows;
  }

  async listById(id) {
    try {
      const query = `SELECT * FROM ${this.#table} WHERE id = ${id}`;
      const result = await pool.query(query);

      const entity = result.rows[0];

      if (!entity) throw new Error("entity not found.");

      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id, newData) {
    try {
      const entity = await this.listById(id);

      const keys = Object.keys(newData);
      const values = Object.values(newData);

      const placeholders = Array.from({ length: keys.length }, (_, index) => {
        if (keys[index] === "id") return undefined;
        return `${keys[index]} = \'${values[index]}\'`;
      })
        .filter(Boolean)
        .join(",");

      const query = `UPDATE ${this.#table} SET ${placeholders} WHERE id = ${id}`;

      console.log(query);

      await pool.query(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

// async function insert(entityJson, table) {
//   try {
//     const fields = Object.keys(entityJson).join(", ");

//     const values = Object.values(entityJson);

//     const preparedStatement = Array.from(
//       { length: values.length },
//       (element, index) => `$${Number(index + 1)}`,
//     ).join(",");

//     const query = `INSERT INTO ${table} (${fields}) VALUES (${preparedStatement})`;

//     await pool.query(query, values);

//     return entityJson;
//   } catch (error) {
//     throw new Error(`an error was ocurred: ${table} - ${error.message}`);
//   }
// }

module.exports = CrudTemplate;
