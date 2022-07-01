const express = require("express");
const { fetchComics, fetchCharacters, fetchComicsOnCharacter } = require("./controllers/api");
const app = express(); // create express app

app.get('/fetch-comics', async (req, res) => {
  try {
    const response = await fetchComics(req.query);
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
    const response = await fetchCharacters(req.query);
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
    const response = await fetchComicsOnCharacter(req.params.characterId, req.query);
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

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
