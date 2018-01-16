import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  message: string;
  constructor() { }

  setMessage(msg) {
    this.message = msg;
  }

  getMessage() {
    return this.message;
  }

}
