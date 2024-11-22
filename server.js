import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import cors package

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'https://spoon-and-fork.vercel.app', // Replace with your frontend's URL
}));


const PORT = 5000;

app.get('/api/recipe/:name', async (req, res) => {
  const recipeName = req.params.name;
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|images|pageimages&exintro&piprop=thumbnail&titles=${encodeURIComponent(recipeName)}&format=json`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe info:', error);
    res.status(500).json({ error: 'Error fetching recipe info' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
