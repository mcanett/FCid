"use server"

import { redirect } from "next/navigation"
import { Decimal } from "@prisma/client/runtime/client"
import { eventService } from "@/modules/event/event.service"

export async function updateEventAction(
  id: number,
  formData: FormData
) {
  const data = {
    name: formData.get("name") as string,
    type: formData.get("type") as any,
    start_date: new Date(formData.get("start_date") as string),
    end_date: new Date(formData.get("end_date") as string),

    price: formData.get("price")
      ? new Decimal(formData.get("price") as string)
      : null,

    presale_price: formData.get("presale_price")
      ? new Decimal(formData.get("presale_price") as string)
      : null,

    exchange_rate_usd: formData.get("exchange_rate_usd")
      ? new Decimal(formData.get("exchange_rate_usd") as string)
      : null,
  }

  await eventService.update(id, data)

  redirect("/events")
}