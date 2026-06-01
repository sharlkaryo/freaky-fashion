DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    brand TEXT NOT NULL,
    sku TEXT,
    price INTEGER NOT NULL,
    category TEXT,
    image TEXT NOT NULL,
    slug TEXT NOT NULL
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    image TEXT NOT NULL
);