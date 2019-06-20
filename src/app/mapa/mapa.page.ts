import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Router } from '@angular/router';
import { ModalController, NavParams, NavController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage {
  map: Map;
  latitud: any;
  longitud: any;

  constructor(
    private router: Router,
    private modalController: ModalController,
    public navparams: NavParams,
    private modalContoller: ModalController,
    public navCtrl: NavController,) { 
      this.latitud = this.navparams.get('latitud');
      this.longitud = this.navparams.get('longitud');
    }
  ionViewDidEnter() {
    this.leafletMap();
  }
  
  atras() {
    this.modalContoller.dismiss();
  }

  leafletMap() {
    this.map = new Map('mapId2').setView([this.latitud, this.longitud], 13);

    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);

    const markPoint = marker([this.latitud, this.longitud]);
    markPoint.bindPopup('<p>Tashi Delek - Bangalore.</p>');
    this.map.addLayer(markPoint);
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}