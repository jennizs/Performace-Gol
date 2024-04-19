import { Conta } from "../model/Conta";
import { ContaRepository } from "../Repository/ContaRepository";

export class ContaController implements ContaRepository{
    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0


    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null){
            buscaConta.visualizar();
        } else 
            console.log("\n número não encontrado\n")
    }
    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar(); 
        };
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log("\n Bem vinde a academia de todes!")
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);
        if (buscaConta != null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log("\n Plano Atualizado com sucesso")
        }else
            console.log("\n Não foi encontrado!")
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log("\n Conta excluída com sucesso!")
        }else
        console.log("\n Não foi encontrado!")

    }
    public gerarNumero(): number{
        return ++ this.numero;
    }
    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas){
            if (conta.numero===numero)
                return conta;
        }
        return null;
    }

}


