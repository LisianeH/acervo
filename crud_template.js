const pool = require("./database/database.js");

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
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }

  async list() {
    const query = `SELECT * FROM ${this.#table}`;
    const result = await pool.query(query);

    return result.rows;
  }

  async findById(id) {
    try {
      const query = `SELECT * FROM ${this.#table} WHERE id = $1`;
      const result = await pool.query(query, [id]);

      const entity = result.rows[0];

      console.log(entity);

      if (!entity) throw new Error("entity not found.");

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }

  async findNameLike(name) {
    try {
      const query = `SELECT * FROM ${this.#table} WHERE name ILIKE $1`;
      const result = await pool.query(query, [`%${name}%`]);

      return result.rows;
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
}

  async update(id, newData) {
    try {
      const keys = Object.keys(newData).filter((key) => key !== "id");

      const values = keys.map((key) => newData[key]);

      const placeholders = Array.from({ length: keys.length }, (_, index) => {
        if (keys[index] === "id") return undefined;
        return `${keys[index]} = $${index + 1}`;
      }).filter(Boolean);
      const query = `UPDATE ${this.#table} SET ${placeholders.join(",")} WHERE id = $${placeholders.length + 1} RETURNING *`;

      const result = await pool.query(query, [...values, id]);
      if (result.rowCount === 0) throw new Error("entity not found!");

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }

  async delete(id) {
    try {
      const query = `DELETE FROM ${this.#table} WHERE id = $1`;
      const result = pool.query(query, [id]);
      if (result.rowCount === 0) throw new Error("entity not found!");
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }
}

module.exports = CrudTemplate;
