import Link from "next/link"
import  { calculateAge, formatDate} from "@/utils/date"

export default function AdolescentInfo({ adolescent }: any) {
  return (
    <section>
      <h1 className="text-2xl font-bold">
        {adolescent.first_name} {adolescent.last_name}
      </h1>
      <p><label>Fecha de nacimiento:</label> {formatDate(adolescent.birthdate)}</p>
      <p><label>Edad:</label> {calculateAge(adolescent.birthdate)} años</p>
      <p><label>Etapa:</label> {adolescent.stage}</p>
      <p><label>Estatus:</label> {adolescent.status}</p>
      <p><label>Creado:</label> {formatDate(adolescent.created_at)}</p>
      <p><label>Ultima edición:</label> {formatDate(adolescent.updated_at)}</p>
      <Link
          href={`/adolescents/${adolescent.id}/edit`}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Editar
        </Link>
    </section>
  )
}