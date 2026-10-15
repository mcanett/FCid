export default function AdolescentRecentEvents({ events }: { events: any[] }) {
    return (
      <section>
        <h2 className="font-semibold">Últimos eventos</h2>
  
        <table>
          <thead>
            <tr>
              <th>Evento</th>
              <th>Fecha</th>
              <th>Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id}>
                <td>{e.event.name}</td>
                <td>{new Date(e.event.start_date).toLocaleDateString()}</td>
                <td>✅</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }