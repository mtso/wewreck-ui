
import React, { PureComponent } from "react"
import { Marker } from "react-simple-maps"
import { Motion, spring } from 'react-motion'

export default class Bubble extends PureComponent {
  constructor() {
    super()

    this.state = {
      opacity: 0.8
    }

    this.timers = []
  }

  componentWillUnmount() {
    this.timers.forEach((handle) => {
      clearTimeout(handle)
    })
  }

  componentDidMount() {
    this.timers && this.timers.push(setTimeout(() => {
      this.setState({
        opacity: 0.1,
      })
    }, 2 * 1000))

    this.timers && this.timers.push(setTimeout(() => {
      this.setState({
        opacity: 0,
      })
    }, 60 * 1000))
  }

  render() {
    const { city, r, ...rest } = this.props
    const { opacity } = this.state

    return (
      <Motion
        defaultStyle={{
          r: 0,
          opacity: 0.8,
        }}
        style={{
          r: spring(r, { stiffness: 210, damping: 20 }),
          opacity: spring(opacity, { stiffness: 210, damping: 20 }),
        }}
      >
        {({ r, opacity }) => (
          <Marker
            marker={this.props.city}
            {...rest}
          >
            <circle
              cx={0}
              cy={0}
              r={r}
              fill={`rgba(255,87,34,${opacity})`}
              stroke="#607D8B"
              strokeWidth="0"
            />
          </Marker>
        )}
      </Motion>
    )
  }
}
