import { OrderWithGameAccount } from './order';

export interface ValidatePayment {
  order: OrderWithGameAccount
  method: 'picpay' | 'mercado_pago'
}

export interface PicpayPaymentStatusResponse {
  authorizationId?: string
  referenceId?: string
  status?: string
  message?: string
}