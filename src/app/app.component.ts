import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AutenticacionService } from './services/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  listado = [];
  listadoPanel = [];

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Sobre Nosotros',
      url: '/about',
      direct: 'forward',
      icon: 'information-circle-outline'
    },
    {
      title: 'Configuración',
      url: '/configuracion',
      icon: 'cog'
    }
  ];

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public sesion : AutenticacionService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.initializeItems();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
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
  ngOnInit() {
 
  }

  initializeItems() {
    this.listadoPanel = this.listado;
  }

}
