import { Server } from "socket.io";
import message from "../models/message.model.js";

export const initalizeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      credentials: true,
    },
  });

  const userSocket = new Map();
  const ActivitesSocket = new Map();

  io.on("connection", (socket) => {
    socket.on("user_connected",(userId) => {
        userSocket.set(userId, socket.id);
        ActivitesSocket.set(userId, "idle");


        socket.broadcast.emit("user_connected", userId);

        socket.emit("users_online",Array.from(userSocket.keys()));

        io.emit("activites",Array.from(ActivitesSocket.entries()));

    })

    socket.on("update_activity",({userId,activity}) => {
        ActivitesSocket.set(userId,activity);
        io.emit("activites",Array.from(ActivitesSocket.entries()));
    })

    socket.on("send_message",async (data) => {
        try {
             const {senderId,receiverId,content} = data;

        const message_instance = await message.create({
            senderId,
            receiverId,
            content
        });
        
        const receiverSocket = userSocket.get(receiverId);
        
        if(receiverSocket){
            io.to(receiverSocket).emit("receive_message",message_instance);
        }

        socket.emit("message_sent",message_instance);
            
        } catch (error) {
            console.error("Message error:", error);
				socket.emit("message_error", error.message);
        }
       
    })
   socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSocket.entries()) {
				// find disconnected user
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSocket.delete(userId);
					ActivitesSocket.delete(userId);
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
			}
        });
  });
};
