import { Socket, io } from "socket.io-client";
import { StudentAnswer } from "../types";

// closing must be handled in the component
export class StudentSocketFacade{
  private socketClient:Socket;
  private studentId:string

  constructor(socketUrl: string, studentId: string) {
    const socket = io(socketUrl)
    this.socketClient = socket;
    this.studentId = studentId;
  }
  public closeConnection() {
    this.socketClient.close()
  }

   sendAnswer(startTime:Date, choice: number) {
    const sentTime = new Date()
     const timeDiff = getTimeDiff(startTime, sentTime);

     const answer: StudentAnswer = {
       choice,
       studentId:this.studentId,
       timeMiliseconds: timeDiff
     };

     this.socketClient.emit(JSON.stringify(answer));
  } 
}



function getTimeDiff(start: Date, end: Date): number {
  return end.getTime() - start.getTime();
}
