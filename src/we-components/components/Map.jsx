import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"
// import request from "superagent"
import Listener from '../data/listener'

import Bubble from './Bubble'

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const cityScale = scaleLinear()
  .domain([0,37843000])
  .range([1,25])

const mapPayloadToCity = (payload) => ({
  id: payload.payment.id,
  name: 'some name',
  coordinates: [
    +payload.geo.lng,
    +payload.geo.lat,
  ],
  population: payload.payment.amount * 10000,
})

class BasicMap extends Component {
  constructor() {
    super()
    this.state = {
      cities: [],
    }
  }

  componentDidMount() {
    // setTimeout(() => this.setState({
    //   cities: this.state.cities.concat([ cities ])
    // }), 500)

    const listener = this.listener = new Listener(this.props.account_id)

    listener.on('new_payment', (payload) => {
      const mapped = mapPayloadToCity(payload)
      console.log(mapped)

      this.setState({
        cities: this.state.cities.concat([ mapped ])
      })
    })
  }

  componentWillUnmount() {
    this.listener && this.listener.close()
  }

  render() {
    const { cities } = this.state
    const { fullscreen } = this.props

    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[-97,38]} zoom={6} disablePanning>
            <Geographies geography="/static/usa-topojson.json">
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.25,
                          outline: "none",
                        },
                        hover: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
              ))}
            </Geographies>
            <Markers>
              {
                cities.map((city) => (
                  <Bubble
                    key={city.id}
                    r={cityScale(city.population)}
                    coordinates={city.coordinates}
                    city={city}
                  />
                ))
              }
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default BasicMap