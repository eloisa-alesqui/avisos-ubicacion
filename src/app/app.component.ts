import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { LoginPage } from '../pages/login/login';
import { UsuarioPage } from '../pages/usuario/usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public googlePlus: GooglePlus) {
    platform.ready().then(() => {
      
      googlePlus.trySilentLogin({
        'scopes': '', 
        'webClientId': '363250084613-pof5e3e7ins7hehrv23e9dolug7j4t1a.apps.googleusercontent.com', 
        'offline': true
      })
      .then((data) => {
        this.nav.push(UsuarioPage);
      }, (error) => {
        this.nav.push(LoginPage);
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

