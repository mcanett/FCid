import { RoleType, EventType } from './..generated/prisma/client';
import { prisma } from '../prisma/prisma';
import { randomUUID } from 'crypto';

async function main() {  
  /***********************************
   *                                 * 
   *         U S U A R I O S         *
   *                                 *
   ***********************************/
  const users = [
    {
      first_name: 'Moises',
      last_name: 'Canett',
      email: 'moises.canett@gmail.com',
      role: RoleType.ADMIN
    },
    {
      first_name: 'Adriana',
      last_name: 'Ruiz',
      email: 'adriana.ruiz.perez@uabc.edu.mx',
      role: RoleType.CAPTURATOR
    }
  ]

  for (const u of users){
    await prisma.user.upsert({
        where: { 
          email: u.email
        },
        update: {},
        create: {
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            role: u.role
        }
    })
  }

  // Fetch all Users
  //const allUsers = await prisma.user.findMany()
  //console.log('All users:', JSON.stringify(allUsers, null, 2))

  /***********************************
   *                                 * 
   *          E V E N T O S          *
   *                                 *
   ***********************************/
  
  // Fechas eventos
  const viernes = new Date("2026-01-09");
  const domingo = new Date("2026-01-11");

  // Fecha desvelada
  const desvelada = new Date("2026-02-13");
  // Fechas campamento
  const campamentoInicio = new Date("2026-07-14");
  const campamentoFin = new Date("2026-07-16");
  const expiracionPreventa = new Date("2026-05-31");

  const events = [
    { 
      name: 'Viernes 9',
      type: EventType.FRIDAY_CLASS,
      start_date: viernes,
      end_date: viernes
    },
    { 
      name: 'Domingo 11',
      type: EventType.SUNDAY_CLASS,
      start_date: domingo,
      end_date: domingo
    },
    { 
      name: 'Desvelada 2026',
      type: EventType.SPECIAL_EVENT,
      start_date: desvelada, 
      end_date: desvelada,
      price: 100.00,
      exchange_rate_usd: 18.00
    },
    {
      name: 'Campamento 2026',
      type: EventType.CAMP,
      start_date: campamentoInicio, 
      end_date: campamentoFin,
      presale_expiration_date: expiracionPreventa,
      presale_price: 2500.00,
      price: 3000.00,
      exchange_rate_usd: 18.00
    }
  ]

  for (const e of events){
    await prisma.event.upsert({
      where: { name: e.name },
      update: {},
      create: {
        name: e.name,
        type: e.type,
        start_date: e.start_date, 
        end_date: e.end_date,
        presale_expiration_date: e.presale_expiration_date || null,
        presale_price: e.presale_price || null,
        price: e.price || null,
        exchange_rate_usd: e.exchange_rate_usd || null
      }
    })
  }

  //console.log('Eventos: ', JSON.stringify(events, null, 2))

  /***********************************
   *                                 * 
   *     A D O L E S C E N T E S     *
   *                                 *
   ***********************************/

  // Fechas de nacimiento
  const nac1 = new Date("2012-05-13")
  const nac2 = new Date("2013-03-22")
  const nac3 = new Date("2014-04-14")

  const adolescents = [
    {
      first_name: 'Juanito',
      last_name: 'Perez',
      birthdate: nac1,
      qr_code: randomUUID()
    },
    {
      first_name: 'Perecila',
      last_name: 'Gonzalez',
      birthdate: nac2,
      qr_code: randomUUID()
    },
    {
      first_name: 'Sutanito',
      last_name: 'Guzman',
      birthdate: nac3,
      qr_code: randomUUID()
    }
  ]

  for (const a of adolescents) {
    await prisma.adolescent.upsert({
      where: { 
        first_name_last_name_birthdate: {
          first_name: a.first_name,
          last_name: a.last_name,
          birthdate: a.birthdate
        }
      },
      update: {},
      create: {
        first_name: a.first_name,
        last_name: a.last_name,
        birthdate: a.birthdate,
        qr_code: randomUUID()
      }
    })
  }

  console.log('Seed ejecutado correctamente!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })