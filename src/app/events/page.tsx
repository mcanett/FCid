import Link from "next/link"
import { eventService } from "@/modules/event/event.service"
import { formatDate } from "@/utils/date"

export default async function EventsPage() {
  const events = await eventService.getAll()

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1>Eventos</h1>
        <Link href="/events/new" className="btn-primary px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          Nuevo evento +
        </Link>
      </div>

      <ul className="space-y-2">
        {events.map(event => (
          <li key={event.id} className="card">
            <Link href={`/events/${event.id}`}>
              <strong>{event.name}</strong>
              {event.start_date.getTime() === event.end_date.getTime() ? ( 
                    <div className="text-sm text-gray-500">
                        {formatDate(event.start_date)}
                    </div>
                ) : (
                    <div className="text-sm text-gray-500">
                        {formatDate(event.start_date)} al {formatDate(event.end_date)}
                    </div>
                )
              } 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}