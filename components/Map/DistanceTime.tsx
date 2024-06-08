import { DirectionDataContext } from '@/context/DirectionDataContext'
import React, { useContext } from 'react'

function DistanceTime() {
    const { directionData, setDirectionData } = useContext(DirectionDataContext)
    return directionData?.routes && (
        <div className='bg-yellow-500 p-3'>
            <h2 className='text-yellow-100 opacity-80 text--[15px]'>
                Distance:<span className='font-bold mr-3 text-gray-900'>
                    {(directionData?.routes[0]?.distance * 0.001).toFixed(0)} km
                </span>
                Duration:<span className='font-bold mr-3 text-gray-900'>
                    {(directionData?.routes[0]?.duration / 60).toFixed(2)} min
                </span>
            </h2>
        </div>
    )
}

export default DistanceTime