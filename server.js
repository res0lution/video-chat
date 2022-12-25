const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketServer = require('./socketServer')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const friendsInvitationRoutes = require('./routes/friendsInvitationRoutes')

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendsInvitationRoutes);

console.log('Starting our server')

const server = http.createServer(app)
socketServer.registerSocketServer(server)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
      server.listen(PORT, () => {
          console.log(`Listening on port ${PORT}`)
      })
  })
  .catch((err) => {
      console.log(`Database connection failed. Server not started.`)
      console.error(err)
  })
