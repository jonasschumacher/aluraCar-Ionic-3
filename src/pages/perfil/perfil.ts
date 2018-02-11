import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../domain/usuario/usuario.service';
import { Usuario } from '../../domain/usuario/usuario';

import { Camera } from '@ionic-native/camera';

@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html'
})
export class PerfilPage {
    public url: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _service: UsuarioService,
        public camera: Camera) { }

    get usuarioLogado(): Usuario {
        return this._service.obtemUsuarioLogado();
    }

    ngOnInit() {
        this.url = this._service.obtemAvatar();
    }

    tiraFoto() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true,
            correctOrientation: true
        }).then(url => {
            this._service.guardaAvatar(url);
            this.url = url;
        }).catch(err => console.log(err));
    }
}
