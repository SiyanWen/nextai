import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import chat from "./chat.js";

dotenv.config();

const app = express();

app.use(cors());

// configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

const PORT = process.env.PORT || 8080;

let filePath;

// RESTful - what does the API do? You should be able to describe it in one sentence.
// GET/POST/DELETE/PATCH/UDPATE
// ststua code 200, 401, 404, 500
// input paylod? param?
// output

app.get("/", (req, res) => {
  res.send("healthy");
});

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    filePath = req.file.path;
    res.send(filePath + "upload successfully.");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/chat", async (req, res) => {
  try {
    const resp = await chat(req.query.question, filePath);
    res.send(resp.text);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Server is running on port ${PORT}`);
});
