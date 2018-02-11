import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = LoginPage;

    // pede para injetar o componente Nav que esta em app.component.html. Lá nosso Nav é representado por ion-nav
    // não pode ser private, ou você terá problemas no final do curso!
    @ViewChild(Nav) public nav: Nav;

    public paginas = [
        { titulo: 'Agendamentos', componente: AgendamentosPage },
        { titulo: 'Pefil', componente: PerfilPage }
    ];

    constructor(
        platform: Platform,
        public splashscreen: SplashScreen,
        public statusBar: StatusBar) {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashscreen.hide();
        });
    }

    abrePagina(pagina): void {
        this.nav.push(pagina.componente);
    }
}
