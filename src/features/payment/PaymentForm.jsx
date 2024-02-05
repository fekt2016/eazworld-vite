// import styled from 'styled-components'
// import Form from '../../ui/Form'
// import Input from '../../ui/Input'
// import FormRow from '../../ui/FormRow'
// import SpinnerMini from '../../ui/SpinnerMini'
// import Select from '../../ui/Select'
// import { useEffect, useState } from 'react'
// import { useCreatePayment } from '../CurrentOrder/useCreatePayment'
// import { useUser } from '../authentication/useUser'
// import { useParams } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { getCurrentBuy } from '../../services/apibuy'

// const Error = styled.p`
//   color: var(--color-red-700);
//   text-align: center;
// `
// const H5 = styled.h5`
//   text-align: center;
//   text-transform: capitalize;
// `

// function PaymentForm() {
//   const [phoneNum, setPhoneNum] = useState('')
//   const [amount, setAmount] = useState('')
//   const [transaction, setTransaction] = useState('')
//   const [account, setAccount] = useState('')
//   const [name, setName] = useState('')
//   const [error, setError] = useState()
//   const [orderId, setOrderId] = useState('')
//   const [isDisabled, setIsDisabled] = useState(false)

//   const { createPayment, isCreating } = useCreatePayment()

//   useEffect(() => emailjs.init(import.meta.env.VITE_YOUR_PUBLIC_KEY), [])

//   const { orderId: order_id } = useParams()

//   const { isLoading, data: buy } = useQuery({
//     queryKey: ['buy'],
//     queryFn: () => getCurrentBuy(order_id),
//   })
//   function handleSubmit(e) {
//     e.preventDefault()
//     if (!phoneNum || !amount || !transaction || !account || !name || !orderId) {
//       setError({
//         title: 'Invalid input',
//         message: 'Please enter the credentials',
//       })
//       return
//     }
//     const pay = currentData[0]

//     createPayment(
//       { phoneNum, amount, transaction, account, name, orderId },

//       {
//         onSettled: () => {
//           setPhoneNum('')
//           setAmount('')
//           setTransaction('')
//           setAccount('')
//           setName('')
//           setOrderId('')
//         },
//       },
//     )
//     emailjs
//       .send(
//         import.meta.env.VITE_YOUR_SERVICE_ID,
//         import.meta.env.VITE_YOUR_PAY_TEMPLATE_ID,
//         {
//           from_name: user.user_metadata.firstName,
//           recipient: user.email,
//           orderId: order_id,
//           currency: pay.currency,
//           amountGh: pay.amountGh,
//           amountUSD: pay.amountUSD,
//           Payment: pay.payment,
//           wallet: pay.wallet,
//           total: pay.totalToPay,
//           phoneNum,
//           amount,
//           transaction,
//           account,
//           name,
//         },
//       )
//       .then(
//         (result) => {
//           console.log(result)
//         },
//         (error) => {
//           console.log(error.text)
//         },
//       )
//     setIsDisabled(true)
//   }

//   const { user } = useUser()
//   const fullName =
//     user.user_metadata.firstName + ' ' + user.user_metadata.lastName
//   if (isLoading) return <Spinner />
//   const { data: currentData } = buy
//   return (
//     <div>
//       <H5>payment for order Id: {order_id}</H5>
//       {error && <Error>{error.message}</Error>}
//       <Form onSubmit={handleSubmit}>
//         <FormRow label="Momo Number">
//           <Input type="tel" onChange={(e) => setPhoneNum(e.target.value)} />
//         </FormRow>
//         <FormRow label="Momo Name">
//           <Input type="text" onChange={(e) => setName(e.target.value)} />
//         </FormRow>
//         <FormRow label="Account Type">
//           <Select onChange={(e) => setAccount(e.target.value)}>
//             <option>Merchant</option>
//             <option>Subscriber</option>
//           </Select>
//         </FormRow>
//         <FormRow label="Amount sent">
//           <Input
//             type="number"
//             step="any"
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </FormRow>
//         <FormRow label="Transaction No.">
//           <Input
//             type="number"
//             onChange={(e) => setTransaction(e.target.value)}
//             maxLength="11"
//           />
//         </FormRow>
//         <FormRow label="Order Id">
//           <Input type="text" onChange={(e) => setOrderId(e.target.value)} />
//         </FormRow>

//         <FormRow>
//           <Button disabled={isDisabled}>
//             {isCreating ? <SpinnerMini /> : 'Submit'}
//           </Button>
//         </FormRow>
//       </Form>
//     </div>
//   )
// }

// export default PaymentForm
