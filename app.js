// import express from "express";
// import Hello from "./hello.js";
// import Lab5 from "./lab5.js";
// const app = express();
// app.use(express.json());
// Hello(app);
// Lab5(app);
// app.listen(4000);
// const express = require("express");
import "dotenv/config";
import session from "express-session";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import mongoose from "mongoose";
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017";
mongoose.connect(CONNECTION_STRING);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the MongoDB database");
});

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
// app.use(cors());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);
