import React, { useEffect, useRef } from "react";
import Head from "next/head";

const Payment = ({ total }) => {

    //ref
    const paymentBtnRef = useRef(null);

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: function (data, actions) {
                    // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total,
                                },
                            },
                        ],
                    });
                },
                onApprove: function (data, actions) {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(function (details) {
                        // This function shows a transaction success message to your buyer.
                        alert("Transaction completed by " + details.payer.name.given_name);
                    });
                },
            })
            .render(paymentBtnRef.current);
        //This function displays Smart Payment Buttons on your web page.
    }, []);
    return (
        <div>
            <Head>
                <title>payment</title>
            </Head>

            <div ref={paymentBtnRef}></div>
        </div>
    );
};

export default Payment;
