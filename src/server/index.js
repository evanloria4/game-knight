const path = require('path');
require('./database');
const dotenv = require('dotenv');

// Loads the .env information into process.env (Do this before requiring app)
// This is how we'll hide our .env info
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { app } = require('./app');

// Set PUBLIC_IP_ADDRESS in .env file
const { DOMAIN_NAME } = process.env;

// Set custom PORT in .env file if different from 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://${DOMAIN_NAME}:${PORT}`);
  // Only show localhost log for a DOMAIN_NAME of 127.0.0.1
  if (DOMAIN_NAME === '127.0.0.1') {
    console.log(`Server listening at http://localhost:${PORT}`);
  }
});
