const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Dot ENV
require("dotenv").config();

const app = express();
const port = 5050;

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.get("/thanks", (req, res) => {
  res.render("thanks");
});
app.get("/error", (req, res) => {
  res.render("error");
});
// CV
app.get("/resume", (req, res) => {
  res.render("resume");
});

// Contact middleware
app.post("/send", (req, res) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Kelvin Contact Page" info@kkimani.com', // sender address
      to: "info@kkimani.com, kelvn.kimani@gmail.com", // list of receivers
      replyTo: req.body.email,
      subject: "New Message from KK's Contact Form", // Subject line
      html: `
    <h1> New message from: ${req.body.name}</h1>
    <p>Phone: ${req.body.phone}</p>
    <p>Email: ${req.body.email}</p>
    <p>Message: ${req.body.message}</p>
    `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  res.redirect("/thanks");

  main().catch(console.error);
});

// 404 pages
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, console.log(`We are live on port ${port}`));
