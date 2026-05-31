export default class ServicoDePagamento {
    #pagamentos
    constructor() {
        this.#pagamentos = [];
    }
    pagar(codigoBarras, empresa, valor) {
        let categoria;

        if (valor > 100.00) {
            categoria = 'cara';
        } else {
            categoria = 'padrão';
        }

        this.#pagamentos.push({
            codigoBarras: codigoBarras,
            empresa: empresa,
            valor: valor,
            categoria: categoria
        });

    }

    // Método para consultar o último pagamento
    consultarUltimoPagamento() {
        // Verifica se há pagamentos na lista para evitar erros
        if (this.#pagamentos.length === 0) {
            return null;
        }
        // Retorna o último item do array
        return this.#pagamentos[this.#pagamentos.length - 1];
    }

    consultar() {
        return this.#pagamentos;
    }
}
