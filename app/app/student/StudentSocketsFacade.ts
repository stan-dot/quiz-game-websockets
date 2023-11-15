import { Socket, io } from "socket.io-client";
import { StudentAnswer } from "../types";

// todo find the functions on close (destrucors) - to close resources before closing the app
export class StudentSocketFacade{
  private socketClient:Socket;
  private studentId:string

  constructor(socketUrl: string, studentId: string) {
    const socket = io(socketUrl)
    this.socketClient = socket;
    this.studentId = studentId;
  }


   sendAnswer(startTime:Date, choice: number) {
    // todo find out diff between emit and send
    // todo check if date lib is the best for this purpose
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


// todo should return miliseconds
// todo make this procise
function getTimeDiff(start: Date, end: Date):number {
  const hourDiff = end.getHours() - start.getHours();
  const minuteDiff = end.getMinutes() - start.getMinutes();
  const secondDiff = end.getSeconds() - start.getSeconds();
  const milisecondsDiff = end.getMilliseconds() - start.getMilliseconds();
  // todo this is likely buggy
  return milisecondsDiff + secondDiff * 1000 + minuteDiff * 60000 + hourDiff * 3600000;
}
