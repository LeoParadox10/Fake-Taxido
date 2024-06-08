"use client"

import { UserLocationContext } from '@/context/UserLocationContext'
import React, { useContext, useEffect, useRef } from 'react'
import { Map, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCoordiContext } from '@/context/SourceCoordiContext';
import { DestinationCoordiContext } from '@/context/DestinationCoordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import { sourceMapsEnabled } from 'process';
import MapBoxRoute from './MapBoxRoute';
import DistanceTime from './DistanceTime';

const MAPBOX_DRIVING_ENDPOINT = "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = '035d2dac-e11f-4441-88fe-840f7e800123'

function MapBoxMap() {

    const mapRef = useRef<any>();

    const { userLocation, setUserLocation } = useContext(UserLocationContext)

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordiContext)
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordiContext)

    const { directionData, setDirectionData } = useContext(DirectionDataContext)

    // Use to fly to source markers location
    useEffect(() => {
        if (sourceCoordinates) {
            mapRef.current?.flyTo({
                center: [sourceCoordinates.lon, sourceCoordinates.lat],
                duration: 2500
            })
        }
    }, [sourceCoordinates])

    // Use to fly to destination markers location
    useEffect(() => {
        if (destinationCoordinates) {
            mapRef.current?.flyTo({
                center: [destinationCoordinates.lon, destinationCoordinates.lat],
                duration: 2500
            })
        }
        if (sourceCoordinates && destinationCoordinates) {
            getDirectionRoute();
        }
    }, [destinationCoordinates])

    const getDirectionRoute = async () => {
        const res = await fetch(MAPBOX_DRIVING_ENDPOINT + sourceCoordinates.lon + "," + sourceCoordinates.lat + ";" +
            destinationCoordinates.lon + "," + destinationCoordinates.lat +
            "?overview=full&geometries=geojson" + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        const result = await res.json();
        console.log(result);
        setDirectionData(result);
    }

    return (
        <div className='p-5'>
            <h2 className='text-[20px] font-semibold'>Map</h2>
            <div className='rounded-lg overflow-hidden'>
                {userLocation ?
                    <Map
                        ref={mapRef}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        initialViewState={{
                            longitude: userLocation?.lon,
                            latitude: userLocation?.lat,
                            zoom: 14
                        }}
                        style={{ width: '100%', height: 550, borderRadius: 10 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        <Markers />
                        {directionData?.routes ? (
                            <MapBoxRoute coordinates={directionData?.routes[0]?.geometry?.coordinates} />
                        ) : null}
                    </Map > : null}
            </div>
            <div className='absolute bottom-[40px] z-20 right-[20px] hidden md:block'>
                <DistanceTime />
            </div>
        </div>
    )
}

export default MapBoxMap