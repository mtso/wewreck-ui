import React, { PureComponent } from 'react'
import Listener from './listener'

const byTimestampDesc = (a, b) => {
  return a.payment.create_time - b.payment.create_time
}

export default function subscribeToPaymentsList(accountId) {
  return (Component) => {

    return class extends PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          payments: []
        }
      }

      componentDidMount() {
        const listener = this.listener = new Listener(accountId)
        listener.on('new_payment', (latestPayment) => {
          this.setState({
            payments: this.state.payments
              .concat([ latestPayment ])
              .sort(byTimestampDesc),
          })
        })
      }

      componentWillUnmount() {
        this.listener && this.listener.close()
      }

      render() {
        return (
          <Component
            payments={this.state.payments}
            {...this.props}
          />
        )
      }
    }
  }
}
