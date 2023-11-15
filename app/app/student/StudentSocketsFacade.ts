import { Socket } from "socket.io-client";

export class StudentSocketFacade{
  private socketClient:Socket;
  private studentId:string

  constructor(socketUrl: string, studentId: string) {
    this.socketClient = new Socket(socketUrl);
    this.studentId = studentId;
  }

   sendAnswer( answer: number) {
    // todo find out diff between emit and send
     this.socketClient.emit(this.studentId, answer);
  } 
}
