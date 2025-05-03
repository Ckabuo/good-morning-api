import express = require('express');
import messageRoutes from './routes/messageRoutes';
import { config } from './config';
import { errorHandler } from "./middleware/errorHandler";
import morgan from 'morgan';
import rateLimit from "express-rate-limit";
import helmet from 'helmet';
import axios from 'axios';
import { sendWhatsAppMessage } from './WhatsappService';

const app = express();

//Production middleware
app.use(express.json());

if (config.nodeEnv === 'production'){
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, //1hour
    limit: 30, //30 request per hour

})

app.use(limiter);

// CORS for production
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(helmet());

app.use('/api/messages', messageRoutes);

//Health check endpoint for production
app.get('/', (req, res) => {
    console.log('I dey Active Chief')
    res.status(200).json({
        status: 'I Dey Active Chief',
    });
});

const keepAlive = async () => {
    try {
        await axios.get(config.serverURL);
        console.log(`server pinged at ${new Date().toISOString()} from ${config.nodeEnv} mode`);

    } catch ( error ) {
        console.log( 'server ping failed', error );
    }
};

setInterval(keepAlive, 1000 * 60 * 14);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server is running on ${ config.port} in ${config.nodeEnv} mode`);
});

// sendWhatsAppMessage('Hello! I dey active my guy');