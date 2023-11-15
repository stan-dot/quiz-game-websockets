import { Socket, io } from "socket.io-client";

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
