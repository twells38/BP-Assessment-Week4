const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getRandom, getAllFortune, addFortune, updateFortune, deleteFortune } = require('./controller')
//endpoint 1
app.get("/api/fortune", getRandom);

//endpoint 2
app.get("/api/showAllFortune", getAllFortune)

//endpoint 3
app.post("/api/addFortune", addFortune)

//endpoint 4
app.put("/api/addFortune/:id", updateFortune)

//endpoint 5
app.delete("/api/addFortune/:id", deleteFortune)

app.listen(4000, () => console.log("Server running on 4000"));