export interface CheckInInput {
    qrCode: string
    eventId: number
    userId: number
  }
  
  export interface CheckInResult {
    success: boolean
    message: string
    adolescent?: {
      id: number
      firstName: string
      lastName: string
      status: string
    }
    eventId?: number
    wasReactivated?: boolean
    checkedInBy?: number
  }