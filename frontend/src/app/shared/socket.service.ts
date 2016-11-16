import {Injectable} from "@angular/core";
import {URL, SOCKET_PORT} from "../config";

@Injectable()
export class SocketService {

  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(`ws://${URL}${SOCKET_PORT}`);
  }

  getSocket(onMessage, onInit?, onOpen?, onClose?, onError?) {
    this.socket.onopen = onOpen;
    this.socket.onmessage = (e) => {
      onMessage(JSON.parse(e.data));
    };
    this.socket.onclose = onClose;
    this.socket.onerror = onError;

    return this.socket;
  }

  send(data) {
    data.token = localStorage.getItem('token');
    const serializedData = JSON.stringify(data);
    this.socket.send(serializedData);
  }
}
