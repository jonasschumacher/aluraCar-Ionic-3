import { Injectable } from "@angular/core";
import { Agendamento } from "./agendamento";
import { Storage } from "@ionic/storage";
import { Carro } from "../carro/carro";

@Injectable()
export class AgendamentoDao {
    constructor(private _storage: Storage) { }

    private _getKey(agendamento: Agendamento) {
        return agendamento.email + agendamento.data.substr(0, 10);
    }

    salva(agendamento: Agendamento) {
        return this._storage.set(this._getKey(agendamento), agendamento);
    }

    listaTodos() {
        let agendamentos = [];
        return this._storage.forEach(dado => {
            console.log(dado);
            let carro = new Carro(dado.carro.nome, dado.carro.preco);
            let agendamento = new Agendamento(carro, dado.valor, dado.nome, dado.endereco, dado.email, dado.data, dado.confirmado);
            agendamentos.push(agendamento);
        })
        .then(() => agendamentos);
    }

    ehAgendamentoDuplicado(agendamento: Agendamento) {
        return this._storage
            .get(this._getKey(agendamento))
            .then(dado => {
                return dado ? true : false;
            });
    }
}