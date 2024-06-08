import React, { useContext } from 'react'
import { Map, Marker } from 'react-map-gl'
import { UserLocationContext } from '@/context/UserLocationContext'
import { SourceCoordiContext } from '@/context/SourceCoordiContext'
import { DestinationCoordiContext } from '@/context/DestinationCoordiContext'

function Markers() {
    const { userLocation, setUserLocation } = useContext(UserLocationContext)

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordiContext)
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordiContext)

    return (
        <div>
            {/* User Marker */}
            <Marker longitude={userLocation?.lon} latitude={userLocation?.lat} anchor="bottom" >
                <img src="./pin.png" alt='Pin'
                    className='w-10 h-10' />
            </Marker>

            {/* Source marker */}
            {sourceCoordinates.length != 0 ? <Marker longitude={sourceCoordinates?.lon} latitude={sourceCoordinates?.lat} anchor="bottom" >
                <img src="./pin.png" alt='Pin'
                    className='w-10 h-10' />
            </Marker> : null}

            {/* Deestination marker */}
            {destinationCoordinates.length != 0 ? <Marker longitude={destinationCoordinates?.lon} latitude={destinationCoordinates?.lat} anchor="bottom" >
                <img src="./pin.png" alt='Pin'
                    className='w-10 h-10' />
            </Marker> : null}

        </div>
    )
}

export default Markers