import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectdTaxiAmountContext } from '@/context/SelectedTaxiAmountContext'
import CarsList from '@/data/CarsList'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

function Cars() {
    const [selectedTaxi, setSelectedTaxi] = useState<any>()
    const { directionData, setDirectionData } = useContext(DirectionDataContext)
    const { taxiAmount, setTaxiAmount } = useContext(SelectdTaxiAmountContext)

    const getCost = (charges: any) => {
        return (charges * directionData.routes[0].distance * 0.001).toFixed(0)
    }

    return (
        <div className='mt-3'>
            <h2 className='font-medium text-[14px]'>Select Taxi</h2>
            <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
                {CarsList.map((item, index) => (
                    <div key={index} className={`m-2 p-2 border-[3px] rounded-md hover:border-yellow-400 cursor-pointer 
                                                ${index == selectedTaxi ? 'border-yellow-400 border-[2px]' : null}`}
                        onClick={() => {
                            setSelectedTaxi(index);
                            setTaxiAmount(getCost(item.charges))
                        }}>
                        <Image src={item.image} alt={item.name} width={50} height={20} className='w-auto justify-self-center' />
                        <h3 className='text-[12px] text-gray-500'>
                            {item.name}
                            {directionData.routes ?
                                <span className='float-right font-medium text-black'>
                                    ₹ {getCost(item.charges)}
                                </span> : null}
                        </h3>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Cars