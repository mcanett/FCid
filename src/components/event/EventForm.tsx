"use client"

import { useState } from "react"
import { EventType } from "@prisma/client"

type Props = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: {
    name?: string
    type?: EventType
    start_date?: string
    end_date?: string
    price?: number
    presale_price?: number
    exchange_rate_usd?: number
  }
}

export function EventForm({ action, defaultValues }: Props) {

    const [loading, setLoading] = useState(false)

    async function onSubmit(formData: FormData) {
        setLoading(true)
        await action(formData)
        setLoading(false)
    }

    return (
    <form action={action} className="space-y-4 max-w-xl">
        <div className="flex flex-wrap">
            {/* Nombre */}
            <div className="grid gap-2">
                <div className="grid grid-cols-1">

                </div>
                <div className="grid grid-cols-1">
                    <label>Nombre del evento </label>
                    <input
                        name="name"
                        required
                        defaultValue={defaultValues?.name}
                    />
                </div>

                {/* Tipo */}
                <div className="grid grid-cols-1">
                    <label>Tipo </label>
                    <select
                        name="type"
                        defaultValue={defaultValues?.type}
                        required
                    >
                        <option value="">Selecciona</option>
                        <option value="FRIDAY_CLASS">Clase de Viernes</option>
                        <option value="SUNDAY_CLASS">Clase de domingo</option>
                        <option value="CALENDAR_EVENT">Evento de calendario</option>
                        <option value="CAMP">Campamento</option>
                        <option value="SPECIAL_EVENT">Evento especial</option>
                    </select>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-1">
                        <label>Fecha inicio </label>
                        <input
                        type="date"
                        name="start_date"
                        required
                        defaultValue={defaultValues?.start_date}
                        />
                    </div>

                    <div className="grid grid-cols-1">
                        <label>Fecha fin </label>
                        <input
                        type="date"
                        name="end_date"
                        required
                        defaultValue={defaultValues?.end_date}
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-2">
                {/* Precios */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-1">
                        <label>Precio </label>
                        <input
                        type="number"
                        step="0.01"
                        name="price"
                        defaultValue={defaultValues?.price}
                        />
                    </div>

                    <div className="grid grid-cols-1">
                        <label>Precio preventa </label>
                        <input
                        type="number"
                        step="0.01"
                        name="presale_price"
                        defaultValue={defaultValues?.presale_price}
                        />
                    </div>
                </div>

                {/* Tipo de cambio */}
                <div className="grid grid-cols-1">
                    <label>Tipo de cambio USD </label>
                    <input
                        type="number"
                        step="0.01"
                        name="exchange_rate_usd"
                        defaultValue={defaultValues?.exchange_rate_usd}
                    />
                </div>
            </div>
        </div>


        <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-sky-600 text-white disabled:opacity-50"
            >
            {loading ? "Guardando..." : "Guardar evento"}
        </button>
    </form>
    )
}