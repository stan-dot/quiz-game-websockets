import { Socket, io } from "socket.io-client";

// todo find the functions on close (destrucors) - to close resources before closing the app
export class TeacherSocketFacade{
  private socketClient:Socket;
  private teacherId:string

  constructor(socketUrl: string, teacherId: string) {
    const socket = io(socketUrl)
    this.socketClient = socket;
    this.teacherId = teacherId;
  }
  public nextQuestion() {

    this.socketClient.emit('new question')
  }



}
