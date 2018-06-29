import React, { PureComponent } from 'react'
import ReactTable from 'react-table'
import "react-table/react-table.css";

import Listener from './data/listener'
import paymentsCache from './data/paymentsCache'

// const makeData = (len = 100) => {
//   return Array(len).fill(0).map((() => {
//     return createPayment()
//   }))
// }

const mapPayloadToPayment = (data) => ({
  amount: data.payment.amount,
  description: data.payment.id,
  customer: `customer-${Date.now()}`,
  timestamp: new Date(data.payment.create_time * 1000).toLocaleString(),
})

export default class PaymentsGraph extends PureComponent {
  constructor(props) {
    super(props)
    const payments = paymentsCache.getAll()
    this.state = {
      data: payments.map(mapPayloadToPayment),
    }
  }
  componentWillUnmount() {
    this.listener && this.listener.close()
  }
  componentDidMount() {
    const listener = this.listener = new Listener(this.props.account_id)

    listener.on('new_payment', (data) => {
      data = mapPayloadToPayment(data)

      // Don't add new data if it's already in the list
      if (this.state.data.any((payment) => payment.id === data.id)) {
        return
      }

      this.setState({
        data: this.state.data.concat([ mapPayloadToPayment(data) ])
      })
    })
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Amount",
              accessor: "amount"
            },
            {
              Header: "Description",
              accessor: "description"
            },
            {
              Header: "Customer",
              accessor: "customer"
            },
            {
              Header: "Timestamp",
              accessor: "timestamp"
            },
          ]}
          defaultPageSize={10}
          defaultSorted={[
            {
              id: 'timestamp',
              desc: true,
            }
          ]}
          className="-striped -highlight"
        />
      </div>
    )
  }
}