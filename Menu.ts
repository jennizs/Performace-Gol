import readlinesync from "readline-sync";
import { ContaController } from "./src/Controller/ContaController";
import { Semestral } from "./src/model/Semestral";
import { Mensal } from "./src/model/Mensal";
import { colors } from "./src/util/Colors";

export function main() {
    const contas = new ContaController();
    let opcao, numero, tipo, pagamento, limite, aniversario;

    const tiposContas = ["Mensal", "Semestral"];
    

    while (true) {
        console.log(colors.bg.black, colors.fg.yellow)
        console.log("********************************************************");
        console.log("*                   ACADEMIA DE TODES                  *");
        console.log("********************************************************");
        console.log("*                                                      *");
        console.log("*               1 - Criar conta                        *");
        console.log("*               2 - Listar todas as Contas             *");
        console.log("*               3 - Buscar Conta por Número(ID)        *");
        console.log("*               4 - Atualizar dados da Conta           *");
        console.log("*               5 - Apagar Conta                       *");
        console.log("*               6 - Sair                               *");
        console.log("*                                                      *");
        console.log("*                      *_____*                         *");
        console.log("*                      ( o.o )                         *");
        console.log("*                       > u <                          *");
        console.log("********************************************************",
        colors.reset);
        
        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao === 6) {
            console.log(colors.fg.magenta,
            "\n Generation Brasil!");
            sobre();
            console.log(colors.reset, "");
            break; // Sair do loop while
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.magenta,
                "\nCriar Conta\n", colors.reset);
                console.log("Digite o número de Registro:");
                numero = readlinesync.question("");

                console.log("Digite o tipo de plano: Mensal/Semestral");
                tipo = readlinesync.keyInSelect(tiposContas, "", { cancel: false }) + 1;

                console.log("Digite o valor do Pagamento:");
                pagamento = parseFloat(readlinesync.question(""));
                if (pagamento < 59) {
                    console.log("Não é o valor correto da mensalidade, você não vai poder criar a conta! ");
                    keyPress();
                    break;
                
                }

                switch (tipo) {
                    case 1:
                        console.log("Quantos dias na semana você irá treinar?");
                        limite = readlinesync.questionFloat("");
                        if (limite< 1 || limite > 3) {
                            console.log("Você só pode treinar até 3 dias na semana.");                        
                         break;
                        }
                         

                        contas.cadastrar(new Mensal(contas.gerarNumero(), tipo, pagamento, limite));
                        break;
                    
                        

                    case 2:
                        console.log("Digite o Mes do seu aniversário: ");
                        aniversario = readlinesync.questionInt("");
                        if (aniversario> 12) {
                            console.log("Digite um mes valido por favor!");                        
                         break;
                        }
                        contas.cadastrar(new Semestral(contas.gerarNumero(), tipo, pagamento, aniversario));
                        break;
                }
                keyPress();
                break;

       
                case 2:
                console.log(colors.fg.magenta,
                    "\nListar todas as Contas\n", colors.reset);
                contas.listarTodas();
                keyPress();
                break;

       
                case 3:
                console.log(colors.fg.magenta,
                    "\nBuscar Conta por Número\n", colors.reset);
                console.log("Digite o número do ID: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);
                keyPress();
                break;

            case 4:
                console.log(colors.fg.magenta,
                    "\n Atualizar dados da Conta\n", colors.reset);
                console.log("Digite o número da Conta:");
               
                numero = readlinesync.questionInt("");

                const conta = contas.buscarNoArray(numero);
                if (conta !== null) {
                    console.log("Atualizar o tipo de mensalidade:");
                    console.log("Digite o tipo de plano: Mensal/Semestral");
                tipo = readlinesync.keyInSelect(tiposContas, "", { cancel: false }) + 1;

                console.log("Realize o pagamento do plano:");
                pagamento = parseFloat(readlinesync.question(""));

                switch (tipo) {
                    case 1:
                        console.log("Quantos dias na semana você irá treinar?");
                        limite = readlinesync.questionFloat("");
                        if (limite< 1 || limite > 3) {
                            console.log("Você só pode treinar até 3 dias na semana.");
                            
                        }
                        contas.atualizar(new Mensal(contas.gerarNumero(), tipo, pagamento, limite));
                        

                    case 2:
                        console.log("Digite o Mes do seu aniversário: ");
                        aniversario = readlinesync.questionInt("");
                        if (aniversario> 12) {
                            console.log("Digite um mes valido por favor!");                        
                         break;
                        }
                        contas.cadastrar(new Semestral(contas.gerarNumero(), tipo, pagamento, aniversario));
                        break;

                }
            }
            
                keyPress();
                break;

            case 5:
                console.log(colors.fg.magenta,
                    "\nApagar Conta\n", colors.reset);
                console.log("Digite o número da Conta:");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);
                keyPress();
                break;

            default:
                console.log("\nopção Inválida\n");
                keyPress();
                break;
        }
    }
}

function keyPress(): void {
    console.log("Pressione Enter para continuar...");
    readlinesync.prompt();
}

export function sobre(): void {
    console.log("***********************************");
    console.log(" Projeto Desenvolvido por: Jennizs ");
    console.log("        Generation Brasil          ");
    console.log("    https://github.com/jennizs     ");
    console.log("***********************************");
}

main();
