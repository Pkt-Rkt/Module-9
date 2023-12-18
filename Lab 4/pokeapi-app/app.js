const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON in the request body
app.use(express.json());

// Pokemon controller
const pokemonController = {
  // Route to get Pokemon by ID using route parameter
  getPokemonById: async (req, res) => {
    const { id } = req.params;

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = response.data;
      res.json(pokemon);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Route to get Pokemon by name using query parameter
  getPokemonByName: async (req, res) => {
    const { name } = req.query;

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemon = response.data;
      res.json(pokemon);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

// Routes
app.get('/api/pokemon/:id', pokemonController.getPokemonById);
app.get('/api/pokemon', pokemonController.getPokemonByName);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//http://localhost:8080/api/pokemon/1 (Replace 1 with the desired Pokemon ID)
//http://localhost:8080/api/pokemon?name=pikachu (Replace "pikachu" with the desired Pokemon name)