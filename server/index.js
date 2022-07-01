const express = require("express");
const path = require("path");
const axios = require("axios");
const { fetchComics, fetchCharacters, fetchComicsOnCharacter } = require("./controllers/api");
const app = express(); // create express app
// import { populateImage } from './controllers/populate-images'

// // add middleware
// app.use(express.static(path.join(__dirname, "..", "client", "dist")));
// app.use(express.static(path.join(__dirname, "views")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
// });
app.get('/fetch-comics', async (req, res) => {
  try {
    const response = await fetchComics();
    res.json({
      data: response
    })
  } catch (error) {
    res.status(500).send({
      error: "fetch comics call failed",
      message: error.message
    })
  }
})

app.get('/fetch-characters', async (req, res) => {
  try {
    const response = await fetchCharacters();
    res.json({
      data: response
    })
  } catch (error) {
    res.status(500).send({
      error: "fetch comics call failed",
      message: error.message
    })
  }
})
app.get('/fetch-comics/:characterId', async (req, res) => {
  try {
    const response = await fetchComicsOnCharacter(req.params.characterId);
    res.json({
      data: response
    })
  } catch (error) {
    res.status(500).send({
      error: "fetch comics call failed",
      message: error.message
    })
  }
})

// app.get("/restaurants", (req, res) => {
//   axios.get('http://cdn.adpushup.com/reactTask.json').then(result => {
//     if(!result || /[4-5][0-9]{2}/.test(result.status) || !result.data) {
//       res.status(500).json({});
//     } else {
//       populateImage(result.data);
//       res.json(result.data);
//     }
//   }).catch(err => {
//     res.status(500).json({});
//   })
// })

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
