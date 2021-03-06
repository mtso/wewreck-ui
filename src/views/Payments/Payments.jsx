import React, { PureComponent } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import AspectRatio from "@material-ui/icons/AspectRatio";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import PaymentsGraph from '../../we-components/PaymentsGraph'
import Map from '../../we-components/components/Map'
import Fullscreen from 'react-fullscreen-crossbrowser';

import config from '../../config.json'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

// function TableList(props) {
//   const { classes } = props;
//   return (
//     <Grid container>
//       {/* Live Payments */}
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader color="primary">
//             <h4 className={classes.cardTitleWhite}>
//               Live Payments
//             </h4>
//             <p className={classes.cardCategoryWhite}>
//               View payments as they come in.
//             </p>
//           </CardHeader>
//           <CardBody>
//             <PaymentsGraph
//               account_id={config.account_id}
//             />
//           </CardBody>
//         </Card>
//       </GridItem>
      
//       {/* Payments by Location */}
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader plain color="primary">
//             <h4 className={classes.cardTitleWhite}>
//               Live Payments Map
//             </h4>
//             <p className={classes.cardCategoryWhite}>
//               View where payments are coming from.
//             </p>
//           </CardHeader>
//           <CardBody>
//             <Button
//               color={window.innerWidth > 959 ? "transparent" : "white"}
//               justIcon={window.innerWidth > 959}
//               simple={!(window.innerWidth > 959)}
//               aria-label="Dashboard"
//               className={classes.buttonLink}
//               onClick={this.toggle}
//             >
//               <AspectRatio />
//             </Button>
//             <Map
//               account_id={config.account_id}
//             />
//           </CardBody>
//         </Card>
//       </GridItem>

//     </Grid>
//   );
// }

class TableList extends PureComponent {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }
  toggle = () => {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        {/* Live Payments */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Live Payments
              </h4>
              <p className={classes.cardCategoryWhite}>
                View payments as they come in.
              </p>
            </CardHeader>
            <CardBody>
              <PaymentsGraph
                account_id={config.account_id}
              />
            </CardBody>
          </Card>
        </GridItem>
        
        {/* Payments by Location */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Live Payments Map
              </h4>
              <p className={classes.cardCategoryWhite}>
                View where payments are coming from.
              </p>
            </CardHeader>
            <Fullscreen
              enabled={this.state.open}
              >
              <CardBody>
                <Button
                  color={window.innerWidth > 959 ? "transparent" : "white"}
                  justIcon={window.innerWidth > 959}
                  simple={!(window.innerWidth > 959)}
                  aria-label="Dashboard"
                  className={classes.buttonLink}
                  onClick={this.toggle}
                >
                  <AspectRatio />
                </Button>
                { this.state.open && <div style={{ height: '100px', width: '3px', display: 'block'}}></div> }
                <Map
                  account_id={config.account_id}
                  fullscreen={this.state.open}
                />
              </CardBody>
            </Fullscreen>
          </Card>
        </GridItem>
  
      </Grid>
    );
  }
}

export default withStyles(styles)(TableList);
