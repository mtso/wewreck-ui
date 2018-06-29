
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
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

const cities = [
  { "name": "Tokyo", "coordinates": [139.6917,35.6895], "population": 37843000, id: Math.random() },
  { "name": "Jakarta", "coordinates": [106.8650,-6.1751], "population": 30539000, id: Math.random() },
  { "name": "Delhi", "coordinates": [77.1025,28.7041], "population": 24998000, id: Math.random() },
  { "name": "Manila", "coordinates": [120.9842,14.5995], "population": 24123000, id: Math.random() },
  { "name": "Seoul", "coordinates": [126.9780,37.5665], "population": 23480000, id: Math.random() },
  { "name": "Shanghai", "coordinates": [121.4737,31.2304], "population": 23416000, id: Math.random() },
  { "name": "Karachi", "coordinates": [67.0099,24.8615], "population": 22123000, id: Math.random() },
  { "name": "Beijing", "coordinates": [116.4074,39.9042], "population": 21009000, id: Math.random() },
  { "name": "New York", "coordinates": [-74.0059,40.7128], "population": 20630000, id: Math.random() },
  { "name": "Guangzhou", "coordinates": [113.2644,23.1291], "population": 20597000, id: Math.random() },
  { "name": "Sao Paulo", "coordinates": [-46.6333,-23.5505], "population": 20365000, id: Math.random() },
  { "name": "Mexico City", "coordinates": [-99.1332,19.4326], "population": 20063000, id: Math.random() },
  { "name": "Mumbai", "coordinates": [72.8777,19.0760], "population": 17712000, id: Math.random() },
  { "name": "Osaka", "coordinates": [135.5022,34.6937], "population": 17444000, id: Math.random() },
  { "name": "Moscow", "coordinates": [37.6173,55.7558], "population": 16170000, id: Math.random() },
  { "name": "Dhaka", "coordinates": [90.4125,23.8103], "population": 15669000, id: Math.random() },
  { "name": "Greater Cairo", "coordinates": [31.2357,30.0444], "population": 15600000, id: Math.random() },
  { "name": "Los Angeles", "coordinates": [-118.2437,34.0522], "population": 15058000, id: Math.random() },
  { "name": "Bangkok", "coordinates": [100.5018,13.7563], "population": 14998000, id: Math.random() },
  { "name": "Kolkata", "coordinates": [88.3639,22.5726], "population": 14667000, id: Math.random() },
  { "name": "Buenos Aires", "coordinates": [-58.3816,-34.6037], "population": 14122000, id: Math.random() },
  { "name": "Tehran", "coordinates": [51.3890,35.6892], "population": 13532000, id: Math.random() },
  { "name": "Istanbul", "coordinates": [28.9784,41.0082], "population": 13287000, id: Math.random() },
  { "name": "Lagos", "coordinates": [3.3792,6.5244], "population": 13123000, id: Math.random() },
  { "name": "Shenzhen", "coordinates": [114.0579,22.5431], "population": 12084000, id: Math.random() },
  { "name": "Rio de Janeiro", "coordinates": [-43.1729,-22.9068], "population": 11727000, id: Math.random() },
  { "name": "Kinshasa", "coordinates": [15.2663,-4.4419], "population": 11587000, id: Math.random() },
  { "name": "Tianjin", "coordinates": [117.3616,39.3434], "population": 10920000, id: Math.random() },
  { "name": "Paris", "coordinates": [2.3522,48.8566], "population": 10858000, id: Math.random() },
  { "name": "Lima", "coordinates": [-77.0428,-12.0464], "population": 10750000, id: Math.random() }
]

const mapPayloadToCity = (payload) => ({
  id: payload.id,
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