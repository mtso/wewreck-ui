import React, { PureComponent } from 'react'

export default class PaymentsContainer extends PureComponent {
  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount() {
    this.listener = new Listener(
      this.props.merchantId
    )

    listener.on('new_payment', this.addNewPayment)
  }

  render() {

  }
}

