import { EventForm } from "@/components/event/EventForm"
//import { eventService } from "@/modules/event/event.service"
import { createEventAction } from "./actions"

export default function NewEventPage() {
  /*async function createEvent(data: any) {
    "use server"

    await createEventAction({
      ...data
    })
  }*/

  return (
    <div>
      <h1 className="mb-4">Nuevo evento</h1>
      <EventForm action={createEventAction} />
    </div>
  )
}