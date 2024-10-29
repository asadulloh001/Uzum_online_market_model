import client from "../db/database.js";

export const migrate = async () => {
  await client.query(`
        CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
        );
    `);

  await client.query(
    `
        
            CREATE TABLE IF NOT EXISTS descriptions (
            id SERIAL PRIMARY KEY,
            description TEXT,
            rating INT CHECK(rating >= 1 AND 5 <= rating),
            model VARCHAR,
            info TEXT,
            quantity INT CHECK(quantity > 0),
            producer VARCHAR NOT NULL
        );
    `
  );

  await client.query(
    `

    CREATE TABLE IF NOT EXISTS salesmen (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    surname VARCHAR NOT NULL,
    phone VARCHAR(13) NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    address VARCHAR,
    card_number BIGINT UNIQUE NOT NULL,
    balance INT CHECK( balance >= 0 ),
    rating INT
);

        
        `
  );

  await client.query(
    `
        
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    category INT REFERENCES categories(id) NOT NULL,
    description INT REFERENCES descriptions(id),
    salesman INT REFERENCES salesmen(id) NOT NULL,
    price REAL CHECK(price > 0) NOT NULL
);

        
        `
  );

  await client.query(
    `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL, 
    surname VARCHAR NOT NULL,
    phone VARCHAR(13) UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    address VARCHAR,
    favorite INT REFERENCES products(id) ON DELETE SET NULL
);
        
        `
  );

  await client.query(
    `
        
    CREATE TABLE IF NOT EXISTS basket (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    fav_product INT REFERENCES products(id) ON DELETE SET NULL
);
        
        `
  );

  await client.query(
    `
    CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    commenter INT REFERENCES users(id) ON DELETE SET NULL,
    comment TEXT NOT NULL
);
        
    `
  );
};
