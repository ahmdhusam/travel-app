export enum PaymentsServiceEvents {
  CREATE_ORDER = 'PaymentsServiceEvents.CREATE_ORDER',
  CHECK_AUTHORIZATION = 'PaymentsServiceEvents.CHECK_AUTHORIZATION',
  GET_ORDER_DATA = 'PaymentsServiceEvents.GET_ORDER_DATA',
  GET_AUTHORIZE_PAYMENT = 'PaymentsServiceEvents.GET_AUTHORIZE_PAYMENT',
  VOID_AUTHORIZATION = 'PaymentsServiceEvents.VOID_AUTHORIZATION',
  CAPTURE_PAYMENT = 'PaymentsServiceEvents.CAPTURE_PAYMENT',
}
