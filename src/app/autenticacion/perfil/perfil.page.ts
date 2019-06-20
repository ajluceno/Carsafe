import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  listado = [];
  
  userEmail: string;
  listadoPanel = [];
  constructor(   private platform: Platform,
    public navCtrl: NavController,
    public sesion : AutenticacionService,
    private statusBar: StatusBar) {
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
  
    goToEditPerfil() {
      this.navCtrl.navigateRoot('/edit-perfil');
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
}
