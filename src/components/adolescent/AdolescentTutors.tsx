export default function AdolescentTutors({ tutors }: { tutors: any[] }) {
    if (!tutors.length) {
      return <p>No hay tutores registrados</p>
    }
  
    return (
      <section>
        <h2 className="font-semibold">Tutores</h2>
        <ul>
          {tutors.map(t => (
            <li key={t.id}>
                {console.log(t)}
                {t.tutor.first_name} {t.tutor.last_name} - {t.tutor.phone} - {t.is_primary && (<label>Primario</label> )}
            </li>
          ))}
        </ul>
      </section>
    )
  }