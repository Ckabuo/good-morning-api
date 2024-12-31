import express = require('express');
import messageRoutes from './routes/messageRoutes';
import { config } from './config';

const app = express();

//Production middleware
app.use(express.json());

// CORS for production
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods','Origin, X-Requested-With, Content-Type, Accept');
   next();
});

app.use('/api/messages', messageRoutes);

//Health check endpoint for production
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Server is running',
    });
})

app.listen(config.port, () => {
    console.log(`Server is running on ${ config.port} in ${config.nodeEnv} mode`);
});