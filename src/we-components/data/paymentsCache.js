class PaymentsCache {
  constructor(storage) {
    this.storage = storage
    this.key = '__PAYMENTS__'
  }

  save(payload) {
    
    let payments
    try {
      payments = JSON.parse(this.storage.getItem(this.key)) || {}
    } catch(err) {
      console.log('cache error:', err)
      payments = {}
    }

    const { id } = payload.payment
    this.storage.setItem(this.key, JSON.stringify(
      Object.assign({}, payments, {
        [id]: payload
      })
    ))
  }

  getAll() {
    try {
      const payments = JSON.parse(this.storage.getItem(this.key))
      const list = Object.keys(payments).reduce((all, id) => {
        return all.concat([ payments[id] ])
      }, [])
      if (list.length > 0) {
        console.log('LIST OF PAYMENTS', list)
        return list
      }
    } catch(err) { console.log('cache error:', err) }
    return []
  }
}

// window.__PAYMENTS_CACHE__ = window.__PAYMENTS_CACHE__ || new PaymentsCache(window.localStorage)

export default new PaymentsCache(window.localStorage) //window.__PAYMENTS_CACHE__
