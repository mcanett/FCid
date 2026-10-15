import { EventForm } from "@/components/event/EventForm"
import { eventService } from "@/modules/event/event.service"
import { updateEventAction } from "./actions"

type Props = {
  params: { id: string }
}

export default async function EditEventPage({ params }: Props) {
    const { id } = await params
    //const id =  await Number(params.id)

  const event = await eventService.getById(Number(id))

  // Creamos una action "atada" al id
  const boundUpdateAction = updateEventAction.bind(null, Number(id))

  return (
    <div>
        <h1 className="mb-4">Editar evento</h1>
        {event !== null && (
            <EventForm
            action={boundUpdateAction}
            defaultValues={{
                name: event.name,
                type: event.type,
                start_date: event.start_date
                .toISOString()
                .slice(0, 10),
                end_date: event.end_date
                .toISOString()
                .slice(0, 10),
                price: event.price
                ? Number(event.price)
                : 0,
                presale_price: event.presale_price
                ? Number(event.presale_price)
                : 0,
                exchange_rate_usd: event.exchange_rate_usd
                ? Number(event.exchange_rate_usd)
                : 0,
            }}
            />
        )}
        {event == null && (
            <h2 className="mb-4">Este evento no existe</h2>
        )}
    </div>
  )
}