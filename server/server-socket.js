let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

//makes player join a socket room
const addPlayerToRoom = (userId, gameCode, teamName) => {
  const socket = getSocketFromUserID(userId);
  socket.join(`${teamName}${gameCode}`);
};

//updates textbox view for all players in a room
const updateTextbox = (newAns, gameCode, teamName) => {
  console.log("EMITTING THE FOLLOWING:");
  console.log(teamName + " " + gameCode);
  console.log(newAns);
  io.emit(`updateText:${teamName}:${gameCode}`, newAns);
  console.log("done emitting");
};

const nextQ = (gameCode, teamName) => {
  io.emit(`nextQ:${teamName}:${gameCode}`);
  console.log("next Q socket emitted")
}

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,
  addPlayerToRoom: addPlayerToRoom,
  updateTextbox: updateTextbox,
  nextQ: nextQ,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
