import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { NavController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {

  listado = [];
  private fotoGal: any;
  userEmail: string;
  listadoPanel = [];

  errorMessage: string = '';
  ciudad: string;
   pais: string;
   nombre: string;
   email: string;
  foto :string;
  uid :string;


  constructor(   private platform: Platform,
    public navCtrl: NavController,
    private camera: Camera,
    public sesion : AutenticacionService,
    private statusBar: StatusBar) {
      this.initializeItems();

      setTimeout (() => {
        this.datosUser();
      }, 1000);

    }
  
    ngOnInit() {
    


      if (this.sesion.email()) {
        this.userEmail = this.sesion.email().email;
      }
      this.datosUser();

     
    }
  
    initializeItems() {
      this.listadoPanel = this.listado;
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

      if(this.listadoPanel[0]["pais"] == null ) {
        this.pais="";
      }
      else{
        this.pais = this.listadoPanel[0]["pais"];
        if (this.listadoPanel [0]["ciudad"] == null ){
          this.ciudad="";
        }
          else{
            this.ciudad = this.listadoPanel [0]["ciudad"];

          }

      }

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

  guardarPerfil(){
    this.nombre = this.listadoPanel[0]["user"];
    this.foto = this.listadoPanel[0]["foto"];
    this.uid = this.listadoPanel[0]["uid"];
    if (this.fotoGal == undefined) {
      if(this.pais=="" || this.ciudad==""||this.pais==undefined || this.ciudad==undefined){
        alert("Rellene todos los campos");
      }
      else{
      this.sesion.guardarPerfil(this.uid,this.nombre, this.userEmail, this.ciudad, this.pais,this.foto);
      this.navCtrl.navigateRoot('/perfil');
      }
    }
    else{
      if(this.pais=="" || this.ciudad==""||this.pais==undefined || this.ciudad==undefined){
        alert("Rellene todos los campos");
      }
      else{
      this.sesion.guardarPerfil(this.uid,this.nombre, this.userEmail, this.ciudad, this.pais,this.fotoGal);
      this.navCtrl.navigateRoot('/perfil');
      }
    }
 
  }

    
}
