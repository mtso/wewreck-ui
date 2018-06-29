import React, { PureComponent } from 'react'
import ReactTable from 'react-table'
import "react-table/react-table.css";

import createPayment from './data/creator'

const makeData = (len = 100) => {
  return Array(len).fill(0).map((() => {
    return createPayment()
  }))
}

export default class PaymentsGraph extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: makeData()
    }
  }
  componentDidMount() {
    setInterval(() => {
      const payment = createPayment()
      console.log(payment)
      this.setState({
        data: this.state.data.concat([
          payment
        ])
      })
    }, 2000)
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