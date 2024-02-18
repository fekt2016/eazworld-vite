import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoLocationSharp } from 'react-icons/io5'

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`
const Maker = styled(IoLocationSharp)`
  font-size: 3rem;
  color: var(--color-red-700);
`
const AnyReactComponent = () => <Maker />
function Maps() {
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState({
    latitude: 5.5834888,
    longitude: -0.1999668,
  })
  useEffect(() => {
    setIsLoading(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    } else {
      console.log('Geolocation is not available in your browser.')
    }
    setIsLoading(false)
  }, [])

  if (isLoading) return <p>loading....</p>

  const defaultProps = {
    center: {
      lat: position.latitude,
      lng: position.longitude,
    },
    zoom: 12,
  }
  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDL4nGMfaGfecmIEMQGA-tZHQbba_aLfOU' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        // center={(position.latitude, position.longitude)}
      >
        <AnyReactComponent lat={position.latitude} lng={position.longitude} />
      </GoogleMapReact>
    </MapContainer>
  )
}

export default Maps
