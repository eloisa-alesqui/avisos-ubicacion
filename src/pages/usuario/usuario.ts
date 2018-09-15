import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../login/login';
import { UsuarioModel } from '../../models/usuario';

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage {

  usuario: UsuarioModel = new UsuarioModel();
  logs: string[] = [];

  constructor(public navCtrl: NavController, public googlePlus: GooglePlus, public nativeStorage: NativeStorage, public geolocation: Geolocation) { }

  ionViewCanEnter() {
    this.nativeStorage.getItem('usuario')
      .then((usuario) => {
        this.usuario.nombre = usuario.nombre;
        this.usuario.email = usuario.email;
        this.usuario.foto = usuario.foto;

        this.geolocation.getCurrentPosition().then((geolocationInfo) => {
          this.usuario.coordenadas.latitud = geolocationInfo.coords.latitude;
          this.usuario.coordenadas.longitud = geolocationInfo.coords.longitude;
        }).catch((error) => {
          console.log(error);
        });

      }, (error) => {
        console.log(error);
      });
  }

  doGoogleLogout() {
    let nav = this.navCtrl;
    this.googlePlus.logout()
      .then((response) => {
        this.nativeStorage.remove('usuario');
        nav.push(LoginPage);
      }, (error) => {
        console.log(error);
      })
  }

}

