const express = require("express");
const app = express();
const port = 5050;

// set the view engine to ejs
app.set("view engine", "ejs");
// Static files
app.use(express.static("./public"));

app.get("/", (req, res) => {
  let items = ["Shoes", "Shirt", "Trousers"];
  res.render("index", { header: "KIM", items: items });
});
app.get("/about", (req, res) => {
  let items = ["Shoes", "Shirt", "Trousers"];
  res.render("about", { header: "KIM", items: items });
});
app.get("/projects", (req, res) => {
  let items = ["Shoes", "Shirt", "Trousers"];
  res.render("projects", { header: "KIM", items: items });
});
app.get("/contact", (req, res) => {
  let items = ["Shoes", "Shirt", "Trousers"];
  res.render("contact", { header: "KIM", items: items });
});
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, console.log(`We are live on port ${port}`));
