DELETE FROM products;

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Svart T-Shirt', 199, 'Levis', '/images/svart-tshirt.png', 'svart-tshirt', 'En svart t-shirt i enkel och bekväm modell.', 'TSH001', 'Kläder');

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Vit T-Shirt', 249, 'Nike', '/images/vit-tshirt.png', 'vit-tshirt', 'En vit t-shirt i mjuk bomull.', 'TSH002', 'Kläder');

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Grå Hoodie', 499, 'Adidas', '/images/gra-hoodie.jpg', 'gra-hoodie', 'Mjuk hoodie för vardagligt bruk.', 'HOD001', 'Kläder');

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Blå Jeans', 699, 'Levis', '/images/bla-jeans.jpg', 'bla-jeans', 'Klassiska blå jeans.', 'JEA001', 'Kläder');

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Svart Jacka', 899, 'Nike', '/images/svart-jacka.jpg', 'svart-jacka', 'Varm jacka för kalla dagar.', 'JAC001', 'Kläder');

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Brun Kappa', 1199, 'Zara', '/images/brun-kappa.jpg', 'brun-kappa', 'Stilren brun kappa.', 'KAP001', 'Kläder');

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Grön Tröja', 399, 'H&M', '/images/gron-troja.jpg', 'gron-troja', 'Bekväm grön tröja.', 'TRO001', 'Kläder');

INSERT INTO products
(name, price, brand, image, slug, description, sku, category)
VALUES
('Beige Skjorta', 549, 'Puma', '/images/beige-skjorta.jpg', 'beige-skjorta', 'Beige skjorta i modern passform.', 'SKJ001', 'Kläder');

DELETE FROM categories;

INSERT INTO categories (name, slug, image)
VALUES
('Kläder', 'klader', '/images/nyheter.png'),
('Accessoarer', 'accessoarer', '/images/kampanj.png'),
('Skor', 'skor', '/images/Bastsaljare.jpg');