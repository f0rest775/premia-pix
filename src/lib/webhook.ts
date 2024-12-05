type WebhookStatus =
  | 'REFUSED'
  | 'CHARGEBACK'
  | 'REFUNDED'
  | 'PENDING'
  | 'APPROVED'

type ExpectedStatus =
  | 'processing'
  | 'authorized'
  | 'paid'
  | 'refunded'
  | 'waiting_payment'
  | 'refused'
  | 'chargedback'
  | 'canceled'
  | 'in_protest'
  | 'partially_paid'

const statusMapping: Record<ExpectedStatus, WebhookStatus> = {
  refused: 'REFUSED',
  chargedback: 'CHARGEBACK',
  refunded: 'REFUNDED',
  canceled: 'REFUNDED',
  processing: 'PENDING',
  paid: 'APPROVED',
  authorized: 'APPROVED',
  waiting_payment: 'PENDING',
  in_protest: 'CHARGEBACK',
  partially_paid: 'PENDING',
}

export function mapWebhookStatusOrbitaPay(
  status: ExpectedStatus
): WebhookStatus {
  return statusMapping[status]
}

