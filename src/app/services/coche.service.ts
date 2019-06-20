import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CocheService {
  coche:any;
  constructor( private database: AngularFirestore,
    private AFauth: AngularFireAuth,){
      this.coche = database.collection<any>(environment.firebase.cocheColection)
    }
  crearCoche(autor: string, ano: string, combustible: string, foto:string, marca:string, modelo:string, latitud:number, longitud:number, matricula:string) {
  
    this.coche.doc(matricula).set({
      marca: marca,
      ano: ano,
      modelo:modelo,
      autor: autor,
      foto: foto,
      latitud: latitud,
      longitud:longitud,
      matricula: matricula
    });

  }


  getMatricula(matricula:string, autor: string){
    console.log(this.coche.ref.where("matricula" , "==" ,matricula).where("autor" , "==" ,autor).get());
    return this.coche.ref.where("matricula" , "==" ,matricula).where("autor" , "==" ,autor).get();

  }



  todosCoches(autor:string){
    console.log(this.coche.ref.where('autor', '==', autor).get());
    return this.coche.ref.where('autor', '==', autor).get();
  }

  borrarCoche(matricula: string) {
    this.coche.doc(matricula).delete();

  }

  actualizarGPS(autor: string, ano: string, combustible: string, foto:string, marca:string, modelo:string, latitud:number, longitud:number, matricula:string) {
    this.coche.doc(matricula).update({
      marca: marca,
      ano: ano,
      modelo:modelo,
      autor: autor,
      foto: foto,
      latitud: latitud,
      longitud:longitud,
      matricula: matricula
    });

  }
}
