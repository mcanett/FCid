import type { Decimal } from "@prisma/client/runtime/client"
import { EventType } from "@prisma/client"

export type CreateEventInput = {
    name: string
    type: EventType
    start_date: Date
    end_date: Date
    presale_price? : Decimal | null
    presale_expiration_date? : Date | null
    price?: Decimal | null
    exchange_rate_usd?: Decimal | null
}
  
export type UpdateEventInput = Partial<CreateEventInput>