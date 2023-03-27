import { Injectable } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserModel } from '../core/models/user.model';
import { Firestore, addDoc, collection, onSnapshot, query, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Appstate } from '../state/app.reducers';
import { setUser, unSetUser } from '../state/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription = new Subscription();

  constructor(
      private auth: Auth,
      private firestore: Firestore,
      private store: Store<Appstate>,
    ) { }

    initAuthListener(){
      this.userSubscription =  authState(this.auth).subscribe( fuser => {

        if (fuser) {
          const refUsers = collection(this.firestore,'users');
          const q = query(refUsers, where("uid", "==", fuser.uid));

          onSnapshot(
            q,
            (docs) => {
              let results: any = []
              docs.forEach((doc) => {
                results.push(doc.data());
              });

              const user = {...results[0]}
              this.store.dispatch(setUser({user}))
            },
            (error) => {
              console.log("error ", error);
            }
          )
        } else {
          this.store.dispatch(unSetUser())
        }
      })
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
