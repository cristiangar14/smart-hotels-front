import { IRoomType } from "../models/roomType.interface";

export const ROOMTYPES:IRoomType[] = [
  {
    name: 'Habitación sencilla',
    description: 'Habitación con una cama individual, ideal para viajeros solitarios o parejas sin hijos.',
    capacity: 1,
    price: 50.00,
    tax: 0.05,
    code: 'SS'
  },
  {
    name: 'Habitación doble',
    description: 'Habitación con una cama doble, perfecta para parejas o viajeros con un acompañante.',
    capacity: 2,
    price: 75.00,
    tax: 0.05,
    code: 'DB'
  },
  {
    name: 'Habitación twin',
    description: 'Habitación con dos camas individuales, ideal para amigos o compañeros de trabajo.',
    capacity: 2,
    price: 80.00,
    tax: 0.05,
    code: 'TW'
  },
  {
    name: 'Habitación triple',
    description: 'Habitación con tres camas individuales o una cama doble y una cama individual, perfecta para familias o grupos de amigos.',
    capacity: 3,
    price: 100.00,
    tax: 0.05,
    code: 'TR'
  },
  {
    name: 'Suite',
    description: 'Habitación de lujo con sala de estar y una o dos habitaciones independientes, ideal para estancias largas o para aquellos que deseen un mayor espacio y comodidad.',
    capacity: 4,
    price: 150.00,
    tax: 0.1,
    code: 'SU'
  }
]
