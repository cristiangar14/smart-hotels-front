import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
      private firestore: Firestore
    ) { }


  sendEmail(booking:any){
    console.log(booking)

    const data = {
      to: booking.responsible.email,
      message: {
        subject: "Confirmación Smart-Hotels",
        text: "Cuerpo del correo de confirmación",
      },
    }
    const hotelsRef = collection(this.firestore, 'mail')

    console.log(booking)


     addDoc(hotelsRef, {...data}).then( () => {
      Swal.fire('Reserva confirmada')

       })
       .catch( error => console.error(error))


  }

}
