import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext } from 'react'

function CheckoutForm() {
    const stripe: any = useStripe()
    const elements = useElements();
    // const { taxiAmount, setTaxiAmount } = useContext(SelectdTaxiAmountContext);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            console.error(submitError);
            return;
        }
        // Create the PaymentIntent and obtain clientSecret from 
        const res = await fetch("/api/create-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: 35,
            }),
        })
        const { clientSecret } = await res.json();

        // console.log(clientSecret);
        const { error } = await stripe.confirmPayment(
            {
                clientSecret: clientSecret,
                // 'Elements' instance that was used to create the Payment
                elements: elements,

                confirmParams: {
                    return_url: "http://localhost:3000/success"
                },
            }
        )
        if (error)
            console.error(error.message)
    }
    return (
        <div className='flex flex-col justify-center items-center w-full mt-6'>
            <form onSubmit={handleSubmit} className='max-w-md'>
                <PaymentElement />
                <button type='submit' className='w-full bg-yellow-500 p-2 rounded-lg mt-2' disabled={!stripe || !elements}>
                    Pay
                </button>
            </form>
        </div>
    )
}
export default CheckoutForm