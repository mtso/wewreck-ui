import React, { PureComponent } from 'react'
import ReactTable from 'react-table'
import "react-table/react-table.css";

import createPayment from './data/creator'

import Listener from './data/listener'

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
    this.state = {
      data: []
    }
  }
  componentWillUnmount() {
    this.listener && this.listener.close()
  }
  componentDidMount() {
    const listener = this.listener = new Listener('55c45c04-a7ef-4123-8b30-0f11c237c59b')//fd46924a-b1cc-4406-a715-4c4828ebba87')

    listener.on('new_payment', (data) => {
      console.log(data)
      console.log(this.state, this.state.data, mapPayloadToPayment(data))
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