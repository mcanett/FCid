import { AdolescentForm } from "@/components/adolescent/AdolescentForm"
import { redirect } from "next/navigation"

async function getAdolescent(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/adolescents/${id}`,
    { cache: "no-store" }
  )
  return res.json()
}

export default async function EditAdolescentPage({
  params,
}: {
  params: { id: string }
}) {
    const { id } = await params

    const adolescent = await getAdolescent(id)

    const formData = {
      ...adolescent,
      birthdate: adolescent.birthdate.slice(0, 10)
    }

    async function handleUpdate(data: any) {
    "use server"

    await fetch(
        `http://localhost:3000/api/adolescents/${id}`,
        {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        }
    )

    redirect("/adolescents")
    }

    return (
        <div>
            <h1>Editar Adolescente</h1>
            <AdolescentForm
            defaultValues={formData}
            onSubmit={handleUpdate}
            />
        </div>
    )
}