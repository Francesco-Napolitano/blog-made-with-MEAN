import * as mongodb from 'mongodb'

export interface Blog {
  titolo: string
  descrizione: string
  categoria:
    | 'Informatica'
    | 'Crescita Personale'
    | 'Lavoro'
    | 'Consigli'
    | 'Riflessioni'
  autore: string
  immagine: string
  data: Date
  minuti_lettura: string
}
