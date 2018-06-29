import EventEmitter from 'eventemitter3'
import WebSocket from 'simple-websocket'
import paymentsCache from './paymentsCache'
export default class Listener extends EventEmitter {
  constructor(accountId) {
    super()
    console.log('making websocket connection')

    const socket = this.socket = new WebSocket('wss://agile-chamber-50593.herokuapp.com/payments')

    socket.on('connect', (data) => {
      console.log('websocket connected')

      socket.send(JSON.stringify({
        type: 'register',
        account_id: accountId,
      }))
      
    })

    socket.on('data', (data) => {
      console.log('Got Message:', data.toString())

      try {
        const payload = JSON.parse(data.toString())
        this.emit('new_payment', payload)
        paymentsCache.save(payload)

      } catch(err) {
        // skip registered message for now
        // console.warn(err)
      }
    })
    
    socket.on('error', function(err) {
      console.warn('socket error', err)
    })
  }

  close() {
    this.socket.destroy()
  }
}
