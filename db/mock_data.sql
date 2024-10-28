BEGIN;
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE descriptions (
    id SERIAL PRIMARY KEY,
    description TEXT,
    rating INT CHECK(rating >= 1 AND 5 <= rating),
    model VARCHAR,
    info TEXT,
    quantity INT CHECK(quantity > 0),
    producer VARCHAR NOT NULL
);

CREATE TABLE salesmen (
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

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    category INT REFERENCES categories(id) NOT NULL,
    description INT REFERENCES descriptions(id),
    salesman INT REFERENCES salesmen(id) NOT NULL,
    price REAL CHECK(price > 0) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL, 
    surname VARCHAR NOT NULL,
    phone VARCHAR(13) UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    address VARCHAR,
    favorite INT REFERENCES products(id) ON DELETE SET NULL
);

CREATE TABLE basket (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    fav_product INT REFERENCES products(id) ON DELETE SET NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    commenter INT REFERENCES users(id) ON DELETE SET NULL,
    comment TEXT NOT NULL
);
COMMIT;


BEGIN;
INSERT INTO categories (name) VALUES 
    ('Electronics'),
    ('Books'),
    ('Clothing'),
    ('Home Appliances');

INSERT INTO salesmen (name, surname, phone, email, password, address, card_number, balance, rating) VALUES 
    ('John', 'Doe', '1234567890123', 'john.doe@example.com', 'Alohomora', '123 Main St', 1111222233334444, 5000, 4),
    ('Jane', 'Smith', '0987654321098', 'jane.smith@example.com', 'Alohomora', '456 Elm St', 5555666677778888, 3000, 5);

INSERT INTO users (name, surname, phone, email, password, address, favorite) VALUES 
    ('Alice', 'Johnson', '1212121212121', 'alice.j@example.com', 'Alice123', '789 Oak St', NULL),
    ('Bob', 'Brown', '3434343434343', 'bob.b@example.com', 'Bob123', '101 Pine St', NULL),
    ('Charlie', 'Davis', '5656565656565', 'charlie.d@example.com', 'Charlie123', '202 Maple St', NULL),
    ('Diana', 'Miller', '7878787878787', 'diana.m@example.com', 'Diana123', '303 Cedar St', NULL);

INSERT INTO descriptions (description, rating, model, info, quantity, producer) VALUES 
    ('High-quality smartphone with latest features', 5, 'Galaxy S21', 'Flagship phone with 5G capability', 50, 'Samsung'),
    ('Comfortable and stylish T-shirt', 5, 'Uniqlo Tee', 'Basic T-shirt available in multiple colors', 200, 'Uniqlo');

INSERT INTO products (name, category, description, salesman, price) VALUES 
    ('Smartphone', 1, 1, 1, 699.99),
    ('Novel', 2, 2, 2, 9.99),
    ('T-shirt', 3, 2, 1, 19.99);

UPDATE users SET favorite = 1 WHERE name = 'Alice';
UPDATE users SET favorite = 2 WHERE name = 'Bob';

INSERT INTO basket (user_id, fav_product) VALUES 
    (1, 1),  -- Alice's basket contains Smartphone
    (2, 2),  -- Bob's basket contains Novel
    (3, 3),  -- Charlie's basket contains T-shirt
    (4, 1);  -- Diana's basket also contains Smartphone

INSERT INTO comments (commenter, comment) VALUES 
    (1, 'Great smartphone with fantastic features!'),
    (2, 'An amazing novel with a powerful message.'),
    (3, 'Love this T-shirt, very comfortable.'),
    (4, 'Excellent build quality on this smartphone!');
COMMIT;


BEGIN;
TRUNCATE TABLE 
    basket, 
    comments, 
    users, 
    products, 
    salesmen, 
    descriptions, 
    categories 
    RESTART IDENTITY CASCADE;
COMMIT;
