import Link from "next/link"
import { calculateAge } from "@/utils/date"

async function getAdolescents() {
    const res = await fetch("http://localhost:3000/api/adolescents", {
    cache: "no-store",
    })
    return res.json()
}

export default async function AdolescentsPage() {
    const adolescents = await getAdolescents()

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h1>Adolescentes</h1>
                <Link href="/adolescents/new" className="btn-primary px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Nuevo adolescente +
                </Link>
            </div>

            <ul>
            {adolescents.map((a: any) => (
                <li key={a.id}>
                    <Link href={"/adolescents/" + a.id}>
                        {a.first_name} {a.last_name}
                    </Link> 
                    — {calculateAge(a.birthdate) + " años"}
                </li>
            ))}
            </ul>
        </div>
    )
}