"use client"

import CheckoutForm from '@/components/Payment/CheckoutForm'
import { SelectdTaxiAmountContext } from '@/context/SelectedTaxiAmountContext'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

function Payment() {

    // const context = useContext(SelectdTaxiAmountContext);
    // if (!context) {
    //     throw new Error("SelectedTaxiAmountContext is not provided.")
    // }
    // const { taxiAmount } = context
    const options: any = {
        mode: 'payment',
        amount: 1000,
        currency: 'usd'
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
}

export default Payment