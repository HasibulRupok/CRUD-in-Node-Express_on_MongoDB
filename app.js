const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// cnnecting to the mongodb database 
// Connect to MongoDB
const url = 'mongodb://localhost:27017/your-database-name';
mongoose.connect('mongodb://localhost:27017/userInfo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
// handel the events on mongoose
// Get the default connection
const db = mongoose.connection;

// Event handler for successful connection
db.on('connected', () => {
    console.log('Mongoose default connection open to MongoDB');
});

// Event handler for error in connection
db.on('error', (err) => {
    console.error('Mongoose default connection error:', err);
});

// Event handler for disconnection
db.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// Event handler when the Node process is terminated
process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// ******* Handel the Routes *******
const userRouter = require('./routers/user');

app.use('/api/user', userRouter);


app.listen(5000, (req, res) => {
    console.log("Server is listening on port 5000...");
})


// ******* TO run with nodemone ******
//        npm run start