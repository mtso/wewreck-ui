import React, { PureComponent } from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";

import subscribeToPaymentsList from '../../we-components/data/subscribeToPaymentsList'
import config from '../../config.json'
import moment from 'moment'

import { withRouter } from 'react-router-dom'

class PaymentNotifications extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      open: false,
    }
  }

  handleClick = (e) => {
    console.log(e.target)
    this.setState({ open: !this.state.open });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes, window, payments } = this.props
    const { open } = this.state
    return (
      <Manager className={classes.manager}>
        <Target>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Notifications"
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            { payments.length > 0 && <span className={classes.notifications}>{ payments.length }</span> }
            <Hidden mdUp>
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
        </Target>
        <Popper
          placement="bottom-start"
          eventsEnabled={open}
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.pooperResponsive
          }
        >
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grow
              in={open}
              id="menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <MenuList role="menu">
                  {
                    payments.slice(0, 5).map((payment) => (
                      <MenuItem
                        key={payment.payment.id}
                        onClick={(e) => {
                          this.props.history.push('/payments', {})
                        }}
                        className={classes.dropdownItem}
                      >
                        { moment(payment.payment.create_time * 1000).format('LT') }: New Payment Created!
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    )
  }
}

export default withRouter(
  subscribeToPaymentsList(config.account_id)(PaymentNotifications)
)
