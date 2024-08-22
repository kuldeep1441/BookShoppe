// import express from 'express';
// import dotenv from 'dotenv';
// import Connection from './database/db.js';
// import DefaultData from './default.js';
// import route from './routes/route.js';
// import cors from 'cors';      // Cross-Origin Resource Sharing
// import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer';
// import path from 'path';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// const app = express();

// // Load environment variables from .env file
// dotenv.config();

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use(
//   cors({
//     origin: ["https://book-shoppe.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

// app.use(bodyParser.json({extended: true}));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use('/', route);

// //paypal
// app.get("/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

// // rough
// app.get("/", (req, res) => {
//   res.json("Hello");
// })



// //seller
// app.post("/send-seller-request", async (req, res) => {
//   const { username, email } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: "kuldeepsinghtanwar2001@gmail.com",
//     subject: "Request to Become a Seller",
//     text: `Username: ${username}\nEmail: ${email}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error); // Log detailed error info
//     res
//       .status(500)
//       .json({ message: "Failed to send email", error: error.toString() });
//   }
// });


// // Ensure Connection function is called after loading environment variables
// Connection().then(() => {
//     // Call DefaultData to insert default data after the database connection is established
//     DefaultData();
// });

// // const __dirname = path.resolve();
// // // app.get("/", (req, res) => {
// // //   app.use(express.static(path.join(__dirname, "client", "dist")));
// // //   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// // // });

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "/client/dist")));

// //   app.get("/", (req, res) =>
// //     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
// //   );
// // } else {
// //   app.get("/", (req, res) => {
// //     res.send("API is running....");
// //   });
// // }

// // const path = require("path");

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "/client/dist")));

// //   // Serve index.html for any other routes
// //   app.get("*", (req, res) =>
// //     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
// //   );
// // } else {
// //   app.get("/", (req, res) => {
// //     res.send("API is running....");
// //   });
// // }



// app.use(notFound);
// app.use(errorHandler);

// const port = 8000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import route from "./routes/route.js";
import cors from "cors"; // Cross-Origin Resource Sharing
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";

const app = express();

// Load environment variables from .env file
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["https://book-shoppe.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use("/", route);

// PayPal endpoint
app.get("/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Email sending endpoint
app.post("/send-seller-request", async (req, res) => {
  const { username, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "kuldeepsinghtanwar2001@gmail.com",
    subject: "Request to Become a Seller",
    text: `Username: ${username}\nEmail: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.toString() });
  }
});

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // Serve index.html for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
