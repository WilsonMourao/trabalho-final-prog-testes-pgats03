import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Testes do Serviço de Pagamento', () => {

    describe('Verificar método construtor', () => {
        it('deve iniciar sem pagamentos', () => {
            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            assert.ok(Array.isArray(servicoDePagamento.consultar()));
            assert.strictEqual(servicoDePagamento.consultar().length, 0);

        });
    });

    describe('Validar realização de pagamento', () => {

        it('Deve adicionar um pagamento à lista', () => {
            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            //Act
            servicoDePagamento.pagar('123456', 'Empresa A', 50);
            const pagamentos = servicoDePagamento.consultar();

            //Assert
            assert.strictEqual(pagamentos.length, 1);
        });

        it('Deve classificar categoria como "cara" quando valor > 100.00 ', function () {
            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            //Act

            servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
            const pagtos = servicoDePagamento.consultar();
            const pgtoFeito = pagtos.at(-1);

            //Assert
            assert.equal(pgtoFeito.categoria, 'cara')
        });

        it('Deve classificar categoria como "padrão" quando valor < 100.00', function () {
            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            //Act
            servicoDePagamento.pagar('0987-7656-3476', 'Continente', 99.25);
            const pagtos = servicoDePagamento.consultar();
            const pgtoFeito = pagtos.at(-1);

            //Assert
            assert.equal(pgtoFeito.categoria, 'padrão')
        });

        it('Deve classificar pagamento como padrão quando valor for exatamente 100', () => {

            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            //Act
            servicoDePagamento.pagar('123456', 'Empresa A', 100);

            const pagamento = servicoDePagamento.consultarUltimoPagamento();

            //Assert
            assert.strictEqual(pagamento.categoria, 'padrão');
        });

        it('Deve armazenar corretamente os dados do pagamento', () => {

            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            //Act
            servicoDePagamento.pagar('789456123', 'Empresa XPTO', 75.50);

            const pagamento = servicoDePagamento.consultarUltimoPagamento();

            //Assert
            assert.deepStrictEqual(pagamento, {
                codigoBarras: '789456123',
                empresa: 'Empresa XPTO',
                valor: 75.50,
                categoria: 'padrão'
            });
        });

        it('Deve retornar último pagamento efetuado ', function () {
            //Act
            const servicoDePagamento = new ServicoDePagamento();
            servicoDePagamento.pagar('0987-7656-3478', 'Mercadona', 299.87);
            servicoDePagamento.pagar('0987-7656-3479', 'Lidl', 45.28);

            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
            //Assert
            const pagtos = servicoDePagamento.consultar();
            const codBarras = pagtos.at(-1).codigoBarras;
            assert.equal(codBarras, '0987-7656-3479')
        })

        it('NÃO deve retornar primeiro pagamento efetuado ', function () {
            //Act
            const servicoDePagamento = new ServicoDePagamento();
            servicoDePagamento.pagar('0987-7656-3478', 'Mercadona', 299.87);
            servicoDePagamento.pagar('0987-7656-3479', 'Lidl', 45.28);

            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
            //Assert
            const pagtos = servicoDePagamento.consultar();
            const codBarras = pagtos.at(0).codigoBarras;
            assert.notEqual(codBarras, '0987-7656-3479')
        })

        it('Deve retornar null quando não houver pagamentos', () => {

            //Act
            const servicoDePagamento = new ServicoDePagamento();

            //Assert
            assert.strictEqual(servicoDePagamento.consultarUltimoPagamento(), null);
        })

        it('Deve retornar todos os pagamentos cadastrados', () => {
            //Act
            const servicoDePagamento = new ServicoDePagamento();
            servicoDePagamento.pagar('111', 'Empresa A', 50);
            servicoDePagamento.pagar('222', 'Empresa B', 200);

            const pagamentos = servicoDePagamento.consultar();

            assert.deepStrictEqual(pagamentos, [
                {
                    codigoBarras: '111',
                    empresa: 'Empresa A',
                    valor: 50,
                    categoria: 'padrão'
                },
                {
                    codigoBarras: '222',
                    empresa: 'Empresa B',
                    valor: 200,
                    categoria: 'cara'
                }
            ]);

        })


    })
})
