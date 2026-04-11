const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//db
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("DB connected")).catch(err=>console.log("DB connection error", err));

// Middleware
app.use(express.json()); 
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow server-to-server and tool requests that do not send an Origin header.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true, 
};

app.use(cors(corsOptions));

const testRoutes = require(('./routes/test'))
const authRoutes = require(('./routes/authRouter'))
const meetingRoutes = require(('./routes/meetingsRouter'))
const companyRoutes = require(('./routes/companyRouter'))
app.use("/", testRoutes)
app.use("/", authRoutes)
app.use("/", meetingRoutes)
app.use("/", companyRoutes)

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});