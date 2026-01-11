console.log("Starting server.js...");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* =======================
   SERVE STATIC FILES
======================= */
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

/* =======================
   ROUTES
======================= */

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Checkout / Order endpoint
app.post("/checkout", (req, res) => {
  const { name, phone, cart, total } = req.body;

  console.log("🛒 New Order Received:");
  console.log("Customer:", name);
  console.log("Phone:", phone);
  console.log("Cart:", cart);
  console.log("Total:", total);

  res.json({
    success: true,
    message: `Payment initialized. Please complete payment of KES ${total} on your phone.`,
  });
});

// Admin login endpoint
app.post("/admin-login", (req, res) => {
  const { email, password, position } = req.body;

  console.log("🔐 Admin Login Attempt:");
  console.log("Email:", email);
  console.log("Position:", position);

  res.json({
    success: true,
    message: "Admin login successful (simulated)",
  });
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
