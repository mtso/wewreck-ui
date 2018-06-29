
import React, { PureComponent } from "react"
import { Marker } from "react-simple-maps"
import { Motion, spring } from 'react-motion'

export default class Bubble extends PureComponent {
  constructor() {
    super()

    this.state = {
    }
  }

  render() {
    const { city, r, ...rest } = this.props
    return (
      <Motion
        defaultStyle={{
          r: 0,
        }}
        style={{
          r: spring(r, { stiffness: 210, damping: 20 })
        }}
      >
        {({ r }) => (
          <Marker
            marker={this.props.city}
            {...rest}
          >
            <circle
              cx={0}
              cy={0}
              r={r}
              fill="rgba(255,87,34,0.8)"
              stroke="#607D8B"
              strokeWidth="2"
            />
          </Marker>
        )}
      </Motion>
    )
  }
}
