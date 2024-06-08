"use client"

import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { DestinationCoordiContext } from "@/context/DestinationCoordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectdTaxiAmountContext } from "@/context/SelectedTaxiAmountContext";
import { SourceCoordiContext } from "@/context/SourceCoordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>()
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([])
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([])

  const [directionData, setDirectionData] = useState<any>([])

  const [taxiAmount, setTaxiAmount] = useState<number>(0)

  useEffect(() => {
    getUserLocation();
  }, [])

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    })
  }
  return (
    <div className="">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordiContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
          <DestinationCoordiContext.Provider value={{ destinationCoordinates, setDestinationCoordinates }}>
            <DirectionDataContext.Provider value={{ directionData, setDirectionData }}>
              <SelectdTaxiAmountContext.Provider value={{ taxiAmount, setTaxiAmount }}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="">
                    <Booking />
                  </div>
                  <div className="col-span-2">
                    <MapBoxMap />
                  </div>
                </div>
              </SelectdTaxiAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCoordiContext.Provider>
        </SourceCoordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
