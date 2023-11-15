import { Socket, io } from "socket.io-client";

// todo find the functions on close (destrucors) - to close resources before closing the app
export class StudentSocketFacade{
  private socketClient:Socket;
  private studentId:string

  constructor(socketUrl: string, studentId: string) {
    const socket = io(socketUrl)
    this.socketClient = socket;
    this.studentId = studentId;
  }


   sendAnswer( answer: number) {
    // todo find out diff between emit and send
     this.socketClient.emit(this.studentId, answer);
  } 
}
