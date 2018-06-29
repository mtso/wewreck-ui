import React, { PureComponent } from "react";
import Update from "@material-ui/icons/Update";
import Schedule from "@material-ui/icons/Schedule";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import subscribeToPayments from '../../we-components/data/subscribeToPayments'
import config from '../../config.json'

class LatestPaymentCard extends PureComponent {
  render() {
    const { latestPayment, classes } = this.props
    const amount = (latestPayment.payment && ('$' + latestPayment.payment.amount)) || 'No new payment'
    const timestamp = (latestPayment.payment
      && new Date(latestPayment.payment.create_time * 1000))
      || null

    return (
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <Schedule />
            </CardIcon>
            <p className={classes.cardCategory}>Latest Payment</p>
            <h3 className={classes.cardTitle}>{ amount }</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <Update />
              {timestamp && timestamp.toLocaleString()}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    )
  }
}

export default subscribeToPayments(config.account_id)(LatestPaymentCard)
