import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { UserModel } from '../core/models/user.model';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private auth: Auth,
      private firestore: Firestore
    ) { }


    initAuthListener(){
      authState(this.auth).subscribe( fuser => { console.log(fuser)})
    }

    login(email:string, password:string): Promise<any>{

      return signInWithEmailAndPassword(this.auth, email, password)
    }

    createUser(email:string, password:string): Promise<any>{
      const name: string = 'cristian'
      const rol:string = 'admin'
      return createUserWithEmailAndPassword(this.auth, email, password)
        .then( ({user}) => {
          const newUser = new UserModel( user.uid, name, rol, email)
          const userRef = collection(this.firestore, 'users')

          return addDoc(userRef, { ...newUser })
        })
    }

    logout(){
      return signOut(this.auth)
    }

    isAuth(){
      return authState(this.auth).pipe(
          map( fbUser => fbUser != null)
        )
    }

}
