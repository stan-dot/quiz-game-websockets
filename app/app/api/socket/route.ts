import { NextApiRequest } from "next";
import { Server } from "socket.io";

export async function GET(req: NextApiRequest, res: any) {
  console.log("res: ", res);
  if (res.socket?.server?.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    if (res && res.socket && res.socket.server) {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
      io.on("connection", (socket) => {
        socket.on("input-change", (msg) => {
          socket.broadcast.emit("update-input", msg);
        });
      });
    }
  }
  // res.end();
}
