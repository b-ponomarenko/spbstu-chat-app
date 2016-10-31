import {Injectable} from '@angular/core';

@Injectable()
export class SocketService {

  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:5000');
  }

  getSocket(onMessage, onOpen?, onClose?, onError?) {
    this.socket.onopen = onOpen;
    this.socket.onmessage = onMessage;
    this.socket.onclose = onClose;
    this.socket.onerror = onError;

    return this.socket;
  }

  send(data) {
    data.token = `Bearer ${localStorage.getItem('token')}`;
    const serializedData = JSON.stringify(data);
    this.socket.send(serializedData);
  }
}
