import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento.service';

import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
    templateUrl: 'cadastro.html'
})
export class CadastroPage {
    public agendamento: Agendamento;
    private _alerta: Alert;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public _alertCtrl: AlertController,
        private _http: Http,
        private _service: AgendamentoService,
        public vibration: Vibration,
        public datePicker: DatePicker) {

        this.agendamento = new Agendamento(navParams.get('carro'), navParams.get('precoTotal'));
        this._alerta = _alertCtrl.create({
            title: 'Aviso',
            buttons: [{ text: 'Ok', handler: () => { this.navCtrl.popToRoot() } }]
        });
    }

    agenda() {
        if (!(this.agendamento.nome && this.agendamento.endereco && this.agendamento.email)) {
            this.vibration.vibrate(100);

            this._alertCtrl.create({
                title: 'Preenchimento obrigatório',
                subTitle: 'Você deve preencher todas as informações',
                buttons: [{ text: 'Ok' }]
            }).present();
            return;
        }

        this._service.agenda(this.agendamento)
            .then(confirmado => {
                confirmado ?
                    this._alerta.setSubTitle('Agendamento realizado com sucesso.') :
                    this._alerta.setSubTitle('Não foi possível realizar o agendamento. Tente novamente mais tarde.');
            })
            .catch(err => {
                this._alerta.setSubTitle(err.message);
            });
        this._alerta.present();
    }

    selecionaData() {
        this.datePicker.show({
            date: new Date(),
            mode: 'date'
        }).then(data => this.agendamento.data = data.toISOString());
    }
}
