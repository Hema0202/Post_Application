require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/user");

const app = express();

mongoose
    .connect("mongodb://localhost:27017/PostApplication")
    .then(() => console.log("Connected with Database"))
    .catch((err) => console.log(err.message));

app.use(express.json());
app.use("/api", router);

router.all("/*", (req, res) =>
    res.status(404).send({
        status: false,
        message: "Not found",
    })
);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.log(err.message);
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
