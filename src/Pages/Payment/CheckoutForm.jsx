// import React, { useContext, useEffect, useState } from "react";
// import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import UseAuth from "../../Hooks/useAuth/UseAuth";
// import useCart from "../../Hooks/useCart/useCart";
// import { AuthContext } from "../../Providers/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const CheckoutForm = ({ total }) => {
//   const navigate = useNavigate();
//   const[cart,refetch]=useCart()
//   const {user}=UseAuth();
//   const {setLoading}=useContext(AuthContext)
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure=useAxiosSecure();
//   const [clientSecrete,setClientSecrete]=useState('');
//   const [transactionId,setTransitionId]=useState();
//   console.log(cart)
//   console.log(setLoading)

//   useEffect(() => {
//         axiosSecure.post('/create-payment-intent', { price: total })
//         .then(res =>{
//           console.log('clientsecrete',res.data.clientSecrete)
//           setClientSecrete(res.data.clientSecrete);
//         })
//     },[axiosSecure, total]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     if (!card) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.error("Payment error:", error.message);
//     }

//     const {paymentIntent,error :confirmError} = await stripe.confirmCardPayment(clientSecrete,{
//       payment_method:{
//         card: card,
//         billing_details:{
//           email:user?.email || 'anonymous',
//           name :user?.displayName || 'anonymous'
//         }
//       }
//     })
//     if(confirmError){
//       console.log('confirm error')
//     }
//     else{
//       console.log('payment intent',paymentIntent)
//       if(paymentIntent.status === 'succeeded'){
//         console.log('transaction id',paymentIntent.id)
//         console.log("Payment success:", paymentMethod);
//         setTransitionId(paymentIntent.id)
//         const payment = {
//           name:user.displayName,
//           email:user.email,
//           price:total,
//           date: new Date(),
//           cartIds:cart.map(item=>item._id),
//           cartItemIds:cart.map(item=>item.id),
//           status:'pending',
//           transactionId:paymentIntent.id,
//         }
//         const res = await axiosSecure.post('/payments',payment);
//         console.log('payment saved',res.data)
//         refetch()
//         navigate(`/invoice/${paymentIntent.id}`);
//         Swal.fire({
//           position: "top-center",
//           icon: "success",
//           title: `Your ${total} has been paid`,
//           showConfirmButton: false,
//           timer: 1500
//         });
//       }
//     }
//   };


 
//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement className="border p-2 rounded-md" />
//       <button
//         type="submit"
//         disabled={!stripe || !clientSecrete }
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Pay ${total.toFixed(2)}
//       </button>
//       {transactionId && <p className=" text-green-600">your transaction id {transactionId} </p>}
//     </form>

//   );
// };

// export default CheckoutForm;
//____________________________________________________________________________________________________________________________________________________

import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/useAuth/UseAuth";
import useCart from "../../Hooks/useCart/useCart";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ total }) => {
  const navigate = useNavigate();
  const [cart, refetch] = useCart();
  const { user } = UseAuth();
  const { setLoading } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecrete, setClientSecrete] = useState('');
  const [transactionId, setTransactionId] = useState();

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: total })
      .then(res => {
        console.log('clientSecrete', res.data.clientSecrete);
        setClientSecrete(res.data.clientSecrete);
      });
  }, [axiosSecure, total]);

  const handleSaveSales = async (transactionId) => {
    try {
      const response = await axiosSecure.post('/sales', {
        cartData: cart, // Save the cart data
        transactionId,  // Save the transaction ID
        userEmail: user.email, // Save user email for reference
        date: new Date(), // Save the timestamp
      });

      console.log("Sales data saved:", response.data);
    } catch (error) {
      console.error("Error saving sales data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Payment error:", error.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecrete, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.log("Confirm error:", confirmError);
    } else {
      if (paymentIntent.status === 'succeeded') {
        console.log('Transaction ID:', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          name: user.displayName,
          email: user.email,
          price: total,
          date: new Date(),
          cartIds: cart.map(item => item._id),
          cartItemIds: cart.map(item => item.id),
          status: 'pending',
          transactionId: paymentIntent.id,
        };

        const res = await axiosSecure.post('/payments', payment);
        console.log("Payment saved:", res.data);
        
        // **Save the cart data in the sales collection**
        await handleSaveSales(paymentIntent.id);

        refetch();
        navigate(`/invoice/${paymentIntent.id}`);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Your ${total} has been paid`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || !clientSecrete}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Pay ${total.toFixed(2)}
      </button>
      {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;

