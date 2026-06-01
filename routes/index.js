var express = require("express");
var router = express.Router();

const db = require("../db/database");
const multer = require("multer");
const path = require("path");

/* MULTER PRODUKTER */

const productStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/products"));
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadProduct = multer({
  storage: productStorage
});

/* MULTER KATEGORIER */

const categoryStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/categories"));
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadCategory = multer({
  storage: categoryStorage
});

/* STARTSIDA */

router.get("/", function(req, res) {
  db.all("SELECT * FROM products", function(err, products) {
    if (err) {
      return res.send(err.message);
    }

    res.render("index", {
      products: products
    });
  });
});

/* PRODUKTDETALJ */

router.get("/products/:slug", function(req, res) {
  const slug = req.params.slug;

  db.get(
    "SELECT * FROM products WHERE slug = ?",
    [slug],
    function(err, product) {
      if (err) {
        return res.send(err.message);
      }

      if (!product) {
        return res.render("error");
      }

      db.all(
        "SELECT * FROM products WHERE slug != ? LIMIT 3",
        [slug],
        function(err, relatedProducts) {
          if (err) {
            return res.send(err.message);
          }

          res.render("product-details", {
            product: product,
            relatedProducts: relatedProducts
          });
        }
      );
    }
  );
});

/* KATEGORISIDA */

router.get("/categories/:slug", function(req, res) {
  const slug = req.params.slug;

  db.get(
    "SELECT * FROM categories WHERE slug = ?",
    [slug],
    function(err, category) {
      if (err) {
        return res.send(err.message);
      }

      if (!category) {
        return res.render("error");
      }

      db.all(
        "SELECT * FROM products WHERE category = ?",
        [category.name],
        function(err, products) {
          if (err) {
            return res.send(err.message);
          }

          res.render("category", {
            category: category,
            products: products
          });
        }
      );
    }
  );
});

/* SÖKRESULTAT */

router.get("/search", function(req, res) {
  const q = req.query.q || "";
  const searchTerm = "%" + q + "%";

  db.all(
    "SELECT * FROM products WHERE name LIKE ?",
    [searchTerm],
    function(err, products) {
      if (err) {
        return res.send(err.message);
      }

      res.render("search", {
        products: products,
        q: q
      });
    }
  );
});

/* ADMIN - LISTA PRODUKTER */

router.get("/admin/products", function(req, res) {
  db.all("SELECT * FROM products", function(err, products) {
    if (err) {
      return res.send(err.message);
    }

    res.render("admin-products", {
      products: products
    });
  });
});

/* ADMIN - NY PRODUKT */

router.get("/admin/products/new", function(req, res) {
  db.all("SELECT * FROM categories", function(err, categories) {
    if (err) {
      return res.send(err.message);
    }

    res.render("admin-new-product", {
      categories: categories
    });
  });
});

/* ADMIN - SPARA PRODUKT */

router.post("/admin/products/new", uploadProduct.single("image"), function(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  const brand = req.body.brand;
  const sku = req.body.sku;
  const price = req.body.price;
  const category = req.body.category;
  const slug = req.body.slug;

  const image = "/images/products/" + req.file.filename;

  db.run(
    `
    INSERT INTO products
    (name, description, brand, sku, price, category, image, slug)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [name, description, brand, sku, price, category, image, slug],
    function(err) {
      if (err) {
        return res.send(err.message);
      }

      res.redirect("/admin/products");
    }
  );
});

/* ADMIN - LISTA KATEGORIER */

router.get("/admin/categories", function(req, res) {
  db.all("SELECT * FROM categories", function(err, categories) {
    if (err) {
      return res.send(err.message);
    }

    res.render("admin-categories", {
      categories: categories
    });
  });
});

/* ADMIN - NY KATEGORI */

router.get("/admin/categories/new", function(req, res) {
  res.render("admin-new-category");
});

/* ADMIN - SPARA KATEGORI */

router.post("/admin/categories/new", uploadCategory.single("image"), function(req, res) {
  const name = req.body.name;
  const slug = req.body.slug;
  const image = "/images/categories/" + req.file.filename;

  db.run(
    "INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)",
    [name, slug, image],
    function(err) {
      if (err) {
        return res.send(err.message);
      }

      res.redirect("/admin/categories");
    }
  );
});

module.exports = router;