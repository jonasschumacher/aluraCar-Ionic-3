import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//Pages
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';

//Providers
import { AgendamentoService } from '../domain/agendamento/agendamento.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Configuração do storage
import { Storage } from '@ionic/storage';

import { AgendamentoDao } from '../domain/agendamento/agendamento.dao';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { LoginPage } from '../pages/login/login';
import { UsuarioService } from '../domain/usuario/usuario.service';
import { PerfilPage } from '../pages/perfil/perfil';
import { HomePage } from '../pages/home/home';

//Componentes nativos
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';
import { Camera } from '@ionic-native/camera';

function provideStorage() {
    return new Storage({
        name: 'aluracar',
        storeName: 'agendamentos'
    });
}

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        EscolhaPage,
        CadastroPage,
        AgendamentosPage,
        LoginPage,
        PerfilPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        HttpModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        EscolhaPage,
        CadastroPage,
        AgendamentosPage,
        LoginPage,
        PerfilPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: Storage, useFactory: provideStorage },
        AgendamentoService,
        UsuarioService,
        AgendamentoDao,
        UsuarioService,
        SplashScreen,
        StatusBar,
        Vibration,
        DatePicker,
        Camera
    ]
})
export class AppModule { }
