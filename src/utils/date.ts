/** Constante de meses en español */
const meses = [ 'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]

/**
 * Calcula la edad basada en la fecha de nacimiento
 * @param birthdate Date | string
 * @returns number (edad en años)
 */
export function calculateAge(birthdate: Date | string): number {
    const birth = new Date(birthdate)
    const today = new Date()

    let age = today.getFullYear() - birth.getFullYear()

    const monthDiff = today.getMonth() - birth.getMonth()
    const dayDiff = today.getDate() - birth.getDate()

    // Si aún no ha cumplido años este año, restamos 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--
    }

    return age
}

/**
 * Formatea fecha al español
 * @param birthdate Date | string
 * @returns string (formato: DD-MONTH-YYYY)
 */
export function formatDate(birthdate: Date | string): string {
    const birth = new Date(birthdate)
    return (birth.getDate() + 1) + '-' + meses[birth.getMonth()] + '-' + birth.getFullYear()
}

/**
 * Formatea 2 fechas al español
 * @param date1 Date | string
 * @param date2 Date | string
 * @returns string
 */
export function formatTwoDates(date1: Date | string, date2: Date | string): string {
    const firstDate = new Date(date1)
    const secondDate = new Date(date2)
    let formattedDates = ""

    if(firstDate.getMonth() == secondDate.getMonth() 
        && firstDate.getFullYear() == secondDate.getFullYear()) {
        formattedDates = "Del " + (firstDate.getDate() + 1) + " al " + (secondDate.getDate() + 1)
        + " de " + meses[firstDate.getMonth()] + " del " + firstDate.getFullYear()
    } else if(firstDate.getMonth() != secondDate.getMonth() 
        && firstDate.getFullYear() == secondDate.getFullYear()){
            formattedDates = "Del " + (firstDate.getDate() + 1) + " de " + meses[firstDate.getMonth()]
            + " al " + (secondDate.getDate() + 1) + " de " + meses[secondDate.getMonth()]
            + " del " + firstDate.getFullYear()
    } else {
        formattedDates = "Del " + (firstDate.getDate() + 1) + " de " + meses[firstDate.getMonth()] + " del " + firstDate.getFullYear()
        + " al " + (secondDate.getDate() + 1) + " de " + meses[secondDate.getMonth()] + " del " + secondDate.getFullYear()
    }

    return formattedDates
}

