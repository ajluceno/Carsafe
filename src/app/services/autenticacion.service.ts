import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
user: any;
  constructor( private database: AngularFirestore,
      private AFauth: AngularFireAuth,){
        this.user = database.collection<any>(environment.firebase.usersColection)
      }
 
  registerUser(email : string , password : string, user : string){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
            const uid = res.user.uid;
            this.database.collection('users').doc(uid).set({
              user: user,
              foto:"https://ya-webdesign.com/images/png-avatar-5.png",
              uid: uid
            })
            resolve(res)
           })
         })
       }
         
   loginUser(email : string , password : string){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("LOG Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }

   email() {
    return this.AFauth.auth.currentUser;
   
  }
  
   userDetails(){
     
    console.log( this.user.ref.where("uid" , "==" ,this.AFauth.auth.currentUser.uid).get())
    return  this.user.ref.where("uid" , "==" ,this.AFauth.auth.currentUser.uid).get();
   }
   


  guardarPerfil(uid: string, nombre: string, email : string, ciudad: string, pais: string, foto: string) {


    this.user.doc(uid).update({
      uid: uid,
      foto: foto,
      user: nombre,
      ciudad: ciudad,
      pais: pais
    })
  }
 }