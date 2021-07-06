import React, { useEffect, useState, useRef } from 'react'
import { TileLayer, MapContainer, Marker, LayerGroup } from 'react-leaflet'

// Import the Component:
import LeafletSearch from './LeafletSearch'

import CITIES from '../data/cities.json'

const maps = {
  base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}

const Map = () => {
  const [map, setMap] = useState(null)
  const [cities, setCities] = useState([])

  // Create the ref for the layer you want to search through:
  const citiesLayerRef = useRef(null)

  useEffect(() => {
    if (!map) return
    if (map) {
      setCities([...CITIES])
    }
  }, [map])

  return (
    <>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={3}
        zoomControl={false}
        style={{ height: '100vh', width: '100%', padding: 0 }}
        whenCreated={(map) => setMap(map)}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={maps.base}
        />
        <LayerGroup ref={citiesLayerRef}>
          {cities.map((city) => {
            return (
              <>
                <Marker position={city} title={city.city} />
              </>
            )
          })}
        </LayerGroup>
        {/* Place Search component inside of map container:  */}
        {citiesLayerRef && citiesLayerRef.current ? (
          // Pass in the layer ref:
          <LeafletSearch searchLayer={citiesLayerRef.current} />
        ) : (
          <></>
        )}
      </MapContainer>
    </>
  )
}

export default Map
