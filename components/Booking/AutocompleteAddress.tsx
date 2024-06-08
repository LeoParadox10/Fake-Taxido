import { DestinationCoordiContext } from '@/context/DestinationCoordiContext'
import { SourceCoordiContext } from '@/context/SourceCoordiContext'
import React, { useContext, useEffect, useState } from 'react'

const session_token = '035d2dac-e11f-4441-88fe-840f7e800123'
const MAPBOX_RETRIEVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'

function AutocompleteAddress() {

    const [source, setSource] = useState<any>('')
    const [destination, setDestination] = useState<any>('')

    const [sourceChange, setSourceChange] = useState<any>(false)
    const [destinationChange, setDestinationChange] = useState<any>(false)

    const [addressList, setAddressList] = useState<any>([])

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordiContext)
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordiContext)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddressList()
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [source, destination])

    const getAddressList = async () => {
        setAddressList([])
        const query = sourceChange ? source : destination
        const res = await fetch(`/api/search-address?q=${query}`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await res.json()
        setAddressList(result)
    }

    const onSourceAddressClick = async (item: any) => {
        setSource(item.full_address ? item.full_address : item.name);
        setAddressList([])
        setSourceChange(false)
        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id +
            "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        const result = await res.json();
        setSourceCoordinates({
            lon: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        })
        console.log(result);
    }

    const onDestinationAddressClick = async (item: any) => {
        setDestination(item.full_address ? item.full_address : item.name);
        setAddressList([])
        setDestinationChange(false)
        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id +
            "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        const result = await res.json();
        setDestinationCoordinates({
            lon: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        })
        console.log(result);
    }

    return (
        <div className='mt-5'>
            <div className='relative'>
                <label className='text-gray-600'>Where from?</label>
                <input type="text" placeholder='from'
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'
                    value={source}
                    onChange={(e) => { setSource(e.target.value); setSourceChange(true) }}
                />
                {addressList?.suggestions && sourceChange ?
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white z-20'>
                        {addressList.suggestions.map((item: any, index: number) => (

                            <h3 key={index} className='p-2 hover:bg-gray-200 cursor-pointer'
                                onClick={() => {
                                    onSourceAddressClick(item);
                                }}>
                                {item.full_address ? item.full_address : item.name}
                            </h3>
                        ))}
                    </div> : null
                }
            </div>
            <div className='relative'>
                <label className='text-gray-600'>Where to?</label>
                <input type="text" placeholder='to'
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'
                    value={destination}
                    onChange={(e) => { setDestination(e.target.value); setDestinationChange(true) }}
                />
                {addressList?.suggestions && destinationChange ?
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h3 key={index} className='p-2 hover:bg-gray-200 cursor-pointer'
                                onClick={() => {
                                    onDestinationAddressClick(item);
                                }}>
                                {item.full_address ? item.full_address : item.name}
                            </h3>
                        ))}
                    </div> : null
                }
            </div>
        </div >
    )
}

export default AutocompleteAddress