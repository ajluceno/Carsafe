import { Component, ViewChild } from '@angular/core';
import { IonSlides, IonInfiniteScroll, NavController, ModalController, NavParams, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';


import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { MapaPage } from '../mapa/mapa.page';
import { CocheService } from '../services/coche.service';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private tabs = ["selectTab(0)", "selectTab(1)"];
  private category: any = "0";
  private ntabs = 2;
  private SwipedTabsIndicator: any = null;
  map: Map;
  id: any;
  ano: any;
  autor: any;
  latitud: any;
  longitud: any;
  marca: any;
  modelo: any;
  matricula: any;
  combustible: any;
  foto: any;

  constructor(
    private router: Router,
    private modalController: ModalController,
    public navparams: NavParams,

    private alertCtrl: AlertController,
    private cocheService: CocheService,
    private modalContoller: ModalController,
    private geolocation: Geolocation,
    public navCtrl: NavController,
    private geoloc: Geolocation) {
    this.id = this.navparams.get('id');
    this.ano = this.navparams.get('ano');
    this.autor = this.navparams.get('autor');
    this.latitud = this.navparams.get('latitud');
    this.longitud = this.navparams.get('longitud');
    this.marca = this.navparams.get('marca');
    this.modelo = this.navparams.get('modelo');
    this.matricula = this.navparams.get('matricula');
    this.combustible = this.navparams.get('combustible');
    this.foto = this.navparams.get('foto');
  }


  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");

  }


  ionViewWillEnter() {
    this.category = "0";
    this.SwipedTabsSlider.length().then(l => {
      this.ntabs = l;
    });
  }


  updateCat(cat: Promise<any>) {
    cat.then(dat => {
      this.category = dat;
      this.category = +this.category;
    });
  }


  updateIndicatorPosition() {
    this.SwipedTabsSlider.getActiveIndex().then(i => {
      if (this.ntabs > i) {
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
      }
    });
  }

  animateIndicator(e) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
        ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
  }


  atras() {
    this.modalContoller.dismiss();
  }


  abrirModal(id, latitud, longitud) {
    this.presentModal(id, latitud, longitud);
  }
  updatePos() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.latitud = geoposition.coords.latitude;
      this.longitud = geoposition.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

      if (this.latitud == undefined || this.longitud == undefined) {
        alert("No se pudo coger la localización. Compruebe que el GPS este activo y tenga la app los permisos de localizacion. Intentelo de nuevo");
      } else {
        this.cocheService.actualizarGPS(this.autor, this.ano, this.combustible, this.foto, this.marca, this.modelo, this.latitud, this.longitud, this.matricula);
        alert("Actualizada Correctamente");
      }

  }

  async presentModal(id: any, latitud: any, longitud: any) {
    const modal = await this.modalContoller.create({
      component: MapaPage,

      componentProps: { id: id, latitud: latitud, longitud: longitud }
    });

    return await modal.present();
  }
  async borrarCoche(id: string) {

    const alert = await this.alertCtrl.create({
      header: "Confirmar borrado",
      message: "¿Estás seguro de que deseas eliminar su coche?",
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel',
          handler: () => {
          
          }
        },
        {
          text: "Aceptar",
          handler: () => {
            this.cocheService.borrarCoche(id);
          this.atras();
          }
        }
      ]
    });

    await alert.present();
  
  }

}

