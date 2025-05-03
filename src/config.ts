import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    serverURL: process.env.SERVER_URL || 'https://good-morning-api.onrender.com/',

    phoneNumber: process.env.PHONE_NUMBER,
    yourRapidAPIKey: process.env.YOUR_RAPIDAPI_KEY || '',
    // yourApiToken: process.env.YOUR_API_TOKEN || '',
    yourApiToken: process.env.YOUR_API_TOKEN as string,
    recipientNumbers: (process.env.RECIPIENT_NUMBERS || '').split(',').map(num => num.trim()),
}