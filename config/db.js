const mongoose = require('mongoose')
require('./.env')

mongoose
  .connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.n2nrh.mongodb.net/social-media')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err))
