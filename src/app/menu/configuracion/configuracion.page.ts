import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  listado = [];
  userEmail: string;
  listadoPanel = [];



  constructor(   private platform: Platform,
    public navCtrl: NavController,
    public sesion : AutenticacionService,
    private statusBar: StatusBar,
    private translate: TranslateService) {
      this.initializeItems();
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
    }

    irPerfil() {
      this.navCtrl.navigateRoot('/perfil');
    }
    
    desconectar(){
      this.sesion.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('/login');
      })
      .catch(error => {
        console.log(error);
      })
  
    }

    cambiarIdioma($event) {
     this.translate.use($event.target.value);
     console.log($event.target.value);
     
    }  

  }

