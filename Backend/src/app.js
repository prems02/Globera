import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';
import { createServer} from 'node:http';
import { Server } from 'socket.io';
import { connectToSocket } from './Controllers/SocketManager.js';
import userRoutes from './routes/users.routes.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit: '40kb'}));
app.use(express.urlencoded({limit : "40kb",extended: true}));
app.use("/api/v1/users", userRoutes);


app.get('/home', (req, res)=>{
    res.send('Hello World');
})

const start = async()=>{
    const db = await mongoose.connect("mongodb+srv://premms:premms@videoconference.rbbyydw.mongodb.net/videoconference?retryWrites=true&w=majority&appName=VideoConference");
    console.log('Database is connected to:', db.connection.host);
    console.log("Connected to DB:", db.connection.name);  // 👈 Add this
    server.listen(app.get("port"), ()=>{
        console.log('Server is running on port 8000');
    });
}
start();
