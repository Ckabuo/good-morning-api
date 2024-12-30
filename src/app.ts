import express = require('express');
import messageRoutes from './routes/messageRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});