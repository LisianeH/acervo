const pool = require("./database/database.js");

class CrudTemplate {
  #table;
  #column;
  #relations;
  #schema;

  constructor(table, column, relations = {}, schema = "public") {
    this.#table = table;
    this.#column = column;
    this.#relations = relations;
    this.#schema = schema;
  }

  setColumn(column) {
    this.#column = column;
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
    let query;

    if (!this.#relations.FK) {
      query = `SELECT * FROM ${this.#table}`;
    } else {
      const relationsQuery = this.getRelationsQuery();
      const fieldsQuery = this.getFieldsQuery();

      query = `SELECT T.*, ${fieldsQuery} FROM ${this.#table} AS T
        ${relationsQuery}
        `;
    }

    const result = await pool.query(query);

    return result.rows;
  }

  async findById(id) {
    try {
      let query;

      if (this.#relations.FK) {
        const fieldsQuery = this.getFieldsQuery();
        const relationsQuery = this.getRelationsQuery();

        query = `SELECT T.*, ${fieldsQuery} FROM ${this.#table} AS T
        ${relationsQuery}
        WHERE T.${this.#relations.PK} = $1
        `;
      } else {
        query = `SELECT * FROM ${this.#table} WHERE ${this.#relations.PK} = $1`;
      }

      const result = await pool.query(query, [id]);
      const entity = result.rows;

      if (!entity) throw new Error("entity not found.");

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }

  async findAllById(id) {
    try {
      let query;

      if (this.#relations.FK) {
        const fieldsQuery = this.getFieldsQuery();
        const relationsQuery = this.getRelationsQuery();

        query = `SELECT T.*, ${fieldsQuery} FROM ${this.#table} AS T
        ${relationsQuery}
        WHERE T.${this.#relations.PK} = $1`;
      } else {
        query = `SELECT * FROM ${this.#table} WHERE ${this.#relations.PK} = $1`;
      }

      const result = await pool.query(query, [id]);

      return result.rows;
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }

  async findByTwoFields(firstColumn, firstValue, secondColumn, secondValue) {
    try {
      const query = `
        SELECT *
        FROM ${this.#table}
        WHERE ${firstColumn} = $1
        AND ${secondColumn} = $2
      `;

      const result = await pool.query(query, [firstValue, secondValue]);

      return result.rows[0] || null;
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }

  async findBySomething(data, column) {
    try {
      const col = column || this.#column;
      if (!col) throw new Error('column not specified for findBySomething');

      const query = `SELECT * FROM ${this.#table} WHERE ${col} = $1`;
      const result = await pool.query(query, [data]);

      return result.rows[0] || null;
    } catch (error) {
      throw new Error(
        `an error was ocurred: ${this.#table} - ${error.message}`,
      );
    }
  }

  async findNameLike(name) {
    try {
      const query = `SELECT * FROM ${this.#table} WHERE title ILIKE $1`;
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

  async updateWithQualify(serieId, userId, newData) {
    try {
      const keys = Object.keys(newData).filter((key) => key !== "id");

      const values = keys.map((key) => newData[key]);

      const placeholders = keys.map((key, index) => {
        return `${key} = $${index + 1}`;
      });

      const query = `
        UPDATE ${this.#table}
        SET ${placeholders.join(", ")}
        WHERE the_user = $${keys.length + 1}
        AND serie = $${keys.length + 2}
        RETURNING *
      `;

      const result = await pool.query(query, [
        ...values,
        userId,
        serieId
      ]);

      if (result.rowCount === 0) {
        throw new Error("entity not found!");
      }

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

  getRelationsQuery() {
    return Array.from(
      { length: this.#relations.include.length },
      (element, index) => {
        const table = this.#relations.include[index];
        return `INNER JOIN ${table} ON ${table}.id = T.${this.#relations.FK[index]}`;
      },
    ).join("\n");
  }

  getFieldsQuery() {
    return Array.from(
      { length: this.#relations.FK.length },
      (element, index) => {
        return `row_to_json(${this.#relations.include[index]}.*) AS ${this.#relations.FK[index]}`;
      },
    ).join(",");
  }
}

module.exports = CrudTemplate;
