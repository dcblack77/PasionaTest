require('./index')
const mongoose = require('mongoose');

mongoose.connect(process.env.urlDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});