import Link from "next/link"
import { eventService } from "@/modules/event/event.service"
import { calculateAge, formatDate, formatTwoDates } from "@/utils/date"
import { QRScannerInput } from "@/components/event/QRScannerInput"
import { formatCurrency } from "@/utils/currency"
import { EventType } from "@prisma/client"

type Props = {
  params: { id: string }
}

export default async function EventDetailPage({ params }: Props) {
  const  { id } = await params

  const event = await eventService.getDetailById(Number(id))

  if (!event) {
    return <div>Evento no encontrado</div>
  }

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <p>Tipo de evento: {event.type === EventType.CAMP ? "Campamento" : event.type === EventType.SPECIAL_EVENT ? "Especial" : event.type === EventType.FRIDAY_CLASS ? "Clase de Viernes" : event.type === EventType.SUNDAY_CLASS ? "Clase de Domingo" : "De calendario"}</p>
          {event.start_date.getTime() === event.end_date.getTime() ? ( 
                    <p>
                        {formatDate(event.start_date)}
                    </p>
                ) : (
                    <p>
                        {formatTwoDates(event.start_date, event.end_date)}
                    </p>
                )
              }
        </div>

        <Link
          href={`/events/${event.id}/edit`}
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          Editar evento
        </Link>
      </div>

      {/* PRECIOS */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <strong>Precio:</strong>{" "}
          {event.price ? `$${formatCurrency(Number(event.price))}` : "N/A"}
        </div>

        <div>
          <strong>Preventa:</strong>{" "}
          {event.presale_price
            ? `$${formatCurrency(Number(event.presale_price))}`
            : "N/A"}
        </div>

        <div>
          <strong>Tipo cambio USD:</strong>{" "}
          {event.exchange_rate_usd
            ? Number(event.exchange_rate_usd)
            : "N/A"}
        </div>
      </div>

      {/* SCANNER */}
      <QRScannerInput eventId={event.id} />

      {/* LISTADO DE ADOLESCENTES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Adolescentes inscritos
        </h2>

        {event.adolescents.length === 0 ? (
          <p>No hay inscritos aún.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left text-black">Nombre</th>
                <th className="p-2 text-left text-black">Edad</th>
                <th className="p-2 text-left text-black">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {event.adolescents.map((reg) => (
                <tr key={reg.id} className="border-t">
                  <td className="p-2">
                    {reg.adolescent.first_name}{" "}
                    {reg.adolescent.last_name}
                  </td>

                  <td className="p-2">
                    {calculateAge(reg.adolescent.birthdate)} años
                  </td>

                  <td className="p-2">
                    <Link
                      href={`/events/${event.id}/payments/new?adolescentId=${reg.adolescent.id}`}
                      className="text-sky-600 underline"
                    >
                      Agregar pago
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}