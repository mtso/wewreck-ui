import React, { PureComponent } from 'react'
import Listener from './listener'

export default function subscribeToPayments(accountId) {
  return (Component) => {

    return class extends PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          latestPayment: {}
        }
      }

      componentDidMount() {
        const listener = this.listener = new Listener(accountId)
        listener.on('new_payment', (latestPayment) => {
          this.setState({
            latestPayment,
          })
        })
      }

      componentWillUnmount() {
        this.listener && this.listener.close()
      }

      render() {
        return (
          <Component
            latestPayment={this.state.latestPayment}
            {...this.props}
          />
        )
      }
    }
  }
}
