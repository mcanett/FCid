import { AdolescentForm } from "@/components/adolescent/AdolescentForm"
import { redirect } from "next/navigation"

export default function NewAdolescentPage() {
  async function handleCreate(data: any) {
    "use server"

    await fetch("http://localhost:3000/api/adolescents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    redirect("/adolescents")
  }

  return (
    <div>
      <h1>Nuevo Adolescente</h1>
      <AdolescentForm onSubmit={handleCreate} />
    </div>
  )
}