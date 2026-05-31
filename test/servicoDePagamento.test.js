import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Testes do Serviço de Pagamento', () => {
    describe('Validar realização de pagamento', () => {
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

    })


})