import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import { UsuarioPage } from '../usuario/usuario';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public nativeStorage: NativeStorage, public googlePlus: GooglePlus) {}

  doGoogleLogin() {
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Por favor, espere...'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '',
      'webClientId': '363250084613-gugfvn34nuvm12qiuffunmcca510ie58.apps.googleusercontent.com',
      'offline': true
    })
      .then((usuario) => {
        console.log("login ok");
        loading.dismiss();
        this.nativeStorage.setItem('usuario', {
          nombre: usuario.displayName,
          email: usuario.email,
          foto: usuario.imageUrl
        })
          .then(() => {
            console.log("user storage ok");
            nav.push(UsuarioPage);
          }, (error) => {
            console.log(error);
          })
      }, (error) => {
        console.log(error);
        loading.dismiss();
      });
  }

}
