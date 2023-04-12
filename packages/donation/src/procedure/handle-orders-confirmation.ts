import { PrismaClient, Status as OrderStatus } from '@prisma/client'
import { ValidatePayment, PicpayPaymentStatusResponse } from '../contracts/payment'
import { onPromiseHandleWrapperPreventError } from '../helpers/handle-errors'
import { apiPicpayService } from '../services/api-picpay'

const prisma = new PrismaClient()

async function validatePayment(order: ValidatePayment['order'], method: ValidatePayment['method']) {
  const referenceId = `${order.GameAccount?.username}:${order.id}`
  switch (method) {
    case 'picpay':
      const responseFromPicpay = await apiPicpayService.get<PicpayPaymentStatusResponse>(`/${referenceId}/status`)
      if (responseFromPicpay.data.status === 'paid') {
        console.log('paid')
        // await prisma.order.update({
        //   where: {
        //     id: order.id
        //   },
        //   data: {
        //     status: OrderStatus.COMPLETED
        //   }
        // })
      }
      console.log(responseFromPicpay.data.status, responseFromPicpay.data.referenceId)
      break
    case 'mercado_pago':
      throw new Error('Not implemented yet')
    default:
      throw new Error('Invalid method')
  }
}

async function handleOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.PENDING
    },
    include: {
      GameAccount: true,
    },
  })
  orders.map(order => validatePayment(order, 'picpay'))
}

export const handleOrdersConfirmationProcedure = () => {
  console.log('--- on handling orders confirmation ---')
  onPromiseHandleWrapperPreventError(handleOrders)
}