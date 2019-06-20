import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

import { NavController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.page.html',
  styleUrls: ['./anadir.page.scss'],
})
export class AnadirPage implements OnInit {

  public onAnadirForm: FormGroup;
  private fotoGal: any;
  marca: string;
  matricula: string
  modelo: string;
  ano: string;
  combustible: string;
  lat: number;
  long: number;
  listado = [];
  listadoPanel = [];
  nombre: any;
  listadoMatricula = [];
  listadoPanelMatricula = [];
  compMatricula = [];


  constructor(private platform: Platform,
    public navCtrl: NavController,
    private cocheService: CocheService,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private geolocation: Geolocation,
    public sesion: AutenticacionService,
    private statusBar: StatusBar) {
    this.getGeolocation();
  }

  ngOnInit() {
    this.onAnadirForm = this.formBuilder.group({
      'marca': [null, Validators.compose([
        Validators.required
      ])],
      'modelo': [null, Validators.compose([
        Validators.required
      ])],
      'ano': [null, Validators.compose([
        Validators.required
      ])],
      'combustible': [null, Validators.compose([
        Validators.required
      ])],
      'matricula': [null, Validators.compose([
        Validators.required
      ])]
    });
    this.datosUser();
  }




  fotoGaleria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight: 600,
      targetWidth: 600
    }
    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.fotoGal = base64Image;
    }, (err) => {

    });
  }

  guardarCoche() {

    if (this.ano == "" || this.combustible == "" || this.marca == "" || this.modelo == "" || this.matricula == "" ||
     this.ano == undefined || this.combustible == undefined || this.marca == undefined || this.modelo == undefined || this.matricula == undefined) {
      alert("Rellene todos los campos");
    }
    else {
      this.nombre = this.listadoPanel[0]["user"];
      this.getMatricula();
      setTimeout(() => {

        if (this.lat == undefined || this.long == undefined) {
          alert("No se pudo coger la localización. Compruebe que el GPS este activo y tenga la app los permisos de localizacion. Intentelo de nuevo");
        } else {


          if (this.fotoGal == undefined) {
            alert("Tiene que añadir una fotografia");
          }
          else {
            if (this.compMatricula < [1]) {
              this.cocheService.crearCoche(this.nombre, this.ano, this.combustible, this.fotoGal, this.marca, this.modelo, this.lat, this.long, this.matricula);
              this.navCtrl.navigateRoot('/home');
            }
            else {
              alert("Ya tiene otro coche con esta Matrícula");
            }
          }
        }
      }, 1000);
    }


  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.lat = geoposition.coords.latitude;
      this.long = geoposition.coords.longitude;
    });
  }


  datosUser() {
    this.sesion.userDetails().then((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;
      console.log(this.listadoPanel);
    });
  }

  getMatricula() {
    this.cocheService.getMatricula(this.matricula, this.nombre).then((querySnapshot) => {
      this.compMatricula = [];
      querySnapshot.forEach((doc) => {
        this.compMatricula.push({ id: doc.id, ...doc.data() });
      });
    });
  }

}
