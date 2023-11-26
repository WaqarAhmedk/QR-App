import React, { useState } from 'react'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import { useFormContext, useWatch } from 'react-hook-form'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Map = () => {
  const { setValue } = useFormContext()
  const [selectedLocation, setSelectedLocation] = useState({
    lat: -24.2744,
    lng: 133.7751
  })
  const mapUrl = useWatch({ name: 'mapUrl' })
  const router = useRouter()
  const { edit_qrId } = router.query
  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '16px'
  }
  
  

  const handleMapClick = event => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setValue('mapLocation', {
      lat: lat,
      lng: lng
    })
    setValue('mapUrl', `https://www.google.com/maps?q=${lat},${lng}`)
    setSelectedLocation({
      lat: lat,
      lng: lng
    })
  }

  useEffect(() => {
    if (edit_qrId && mapUrl) {
      const pattern = /q=(.*),(.*)$/
      const matches = mapUrl.match(pattern)

      if (matches && matches.length >= 3) {
        const lat = parseFloat(matches[1])
        const lng = parseFloat(matches[2])
        setSelectedLocation({
          lat: lat,
          lng: lng
        })
      } else {
        console.log(
          'Latitude and longitude values not found in the URL.'
        )
      }
    }
  }, [mapUrl])

  return (
    <div>
      <LoadScript googleMapsApiKey='AIzaSyB_laT0Fi__NkfSLvWXyfqdXf_xEWIq8fs'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation}
          zoom={4}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
