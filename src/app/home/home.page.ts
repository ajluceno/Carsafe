import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, PopoverController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { AutenticacionService } from '../services/autenticacion.service';
import { CocheService } from '../services/coche.service';
import { HomeModalPage } from '../home-modal/home-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchKey = '';
  yourLocation = 'Av. Juan Carlos I, s/n, 14520';
  listado = [];
  listadoPanel = [];
  listadoCoche = [];
  listadoPanelCoche = [];
  nombre: any;

  constructor(
    public navCtrl: NavController,
    private cocheService: CocheService,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public sesion: AutenticacionService,
    
    private modalContoller: ModalController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,


  ) {
    this.datosUser();
    setTimeout(() => {
      this.datosCoche(this.listadoPanel[0]["user"]);
    }, 1000);

  }

  ngOnInit() {

    this.datosUser();

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  datosCoche(nombre: string) {
    this.cocheService.todosCoches(nombre).then((querySnapshot) => {
      this.listadoCoche = [];
      querySnapshot.forEach((doc) => {
        this.listadoCoche.push({ id: doc.id, ...doc.data() });
      });
      this.listadoPanelCoche = this.listadoCoche;
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

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Cambiar localización',
      message: '',
      inputs: [
        {
          name: 'Localización',
          placeholder: 'Intruduce tu nueva localización',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cambiar',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Localización cambiada correctamente',
              duration: 3000,
              position: 'top',
              closeButtonText: 'Vale',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }


  doRefresh(refresher) {
    
      console.log(this.listado);
      this.listadoPanel = this.listado;
      this.cocheService.todosCoches(this.listadoPanel[0]["user"]).then((querySnapshot) => {
        this.listadoCoche = [];
        querySnapshot.forEach((doc) => {
          this.listadoCoche.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanelCoche = this.listadoCoche;
      });
    refresher.target.complete();
  }

  abrirModal(id, ano, autor, foto, latitud, longitud, marca,modelo,matricula) {
    this.presentModal(id, ano, autor, foto, latitud, longitud, marca,modelo, matricula);
  }

  async presentModal(id: any, ano: any, autor: any, foto: any, latitud: any, longitud:any, marca:any,modelo:any, matricula:any) {
    const modal = await this.modalContoller.create({
      component: HomeModalPage,

      componentProps: { id: id, ano: ano, autor:autor,foto: foto, latitud: latitud, longitud: longitud, marca:marca, modelo:modelo , matricula:matricula }
    });

    return await modal.present();
  }
   
   getFilteredItem(ev: any, refresher) {
    const val = ev.target.value;
    
    if (val && val.trim() != '') {
      this.listadoPanelCoche = this.listadoCoche.filter((item) => {
    
    return (item.marca.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else { 
      this.doRefresh(refresher);
    }
  }


}