const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for playing cards
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

let nextId = 4;

// GET /cards - Retrieve all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// GET /cards/:id - Retrieve a specific card by ID
app.get('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);
  
  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }
  
  res.json(card);
});

// POST /cards - Create a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  
  // Validate required fields
  if (!suit || !value) {
    return res.status(400).json({ 
      error: 'Both suit and value are required' 
    });
  }
  
  // Create new card
  const newCard = {
    id: nextId++,
    suit: suit,
    value: value
  };
  
  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE /cards/:id - Delete a card by ID
app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex(c => c.id === cardId);
  
  if (cardIndex === -1) {
    return res.status(404).json({ error: 'Card not found' });
  }
  
  const deletedCard = cards.splice(cardIndex, 1)[0];
  res.json({
    message: `Card with ID ${cardId} removed`,
    card: deletedCard
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /cards     - Get all cards');
  console.log('  GET    /cards/:id - Get a specific card');
  console.log('  POST   /cards     - Create a new card');
  console.log('  DELETE /cards/:id - Delete a card');
});
