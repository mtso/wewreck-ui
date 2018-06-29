import EventEmitter from 'eventemitter3'
import WebSocket from 'simple-websocket'

export default class Listener extends EventEmitter {
  constructor(merchantId) {
    super()

    const socket = this.socket = new WebSocket('wss://agile-chamber-50593.herokuapp.com/pingpong')

    socket.on('connect', (data) => {

      socket.send({
        type: 'register',
        merchantId: merchantId,
      })
      
      this.sender = setInterval(() => socket.send('ping'), 1000)
    })
    socket.on('data', (data) => {
      this.emit('new_payment', data.toString())
    })
    socket.on('error', function(err) {
      console.warn('socket error', err)
    })
  }

  close() {
    clearInterval(this.sender)
    this.socket.destroy()
  }
}
