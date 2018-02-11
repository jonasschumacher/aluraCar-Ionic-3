import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from './usuario';

const KEY = 'avatarUrl';

@Injectable()
export class UsuarioService {
    private _usuarioLogado: Usuario; // nova propriedade, que guarda o usuário logado.

    constructor(private _http: Http) { }

    public efetuaLogin(email: string, senha: string) {
        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;

        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                this._usuarioLogado = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
                return this._usuarioLogado;
            });
    }

    obtemUsuarioLogado() {
        return this._usuarioLogado;
    }

    guardaAvatar(url) {
        localStorage.setItem(KEY, url);
    }

    obtemAvatar() {
        return localStorage.getItem(KEY);
    }
}