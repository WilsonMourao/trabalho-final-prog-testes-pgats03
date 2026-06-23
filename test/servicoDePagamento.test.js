import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Testes do Serviço de Pagamento', () => {

    describe('Verificar método construtor', () => {
        it('deve iniciar sem pagamentos', () => {
             //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            expect(servicoDePagamento.consultar()).to.be.an('array').that.is.empty;
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
            expect(pagamentos).to.have.lengthOf(1);
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

        it('deve classificar pagamento como padrão quando valor for exatamente 100', () => {
           
            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

           //Act
            servicoDePagamento.pagar('123456', 'Empresa A', 100);

            const pagamento = servico.consultarUltimoPagamento();

            //Assert
            expect(pagamento.categoria).to.equal('padrão');
        });

         it('deve armazenar corretamente os dados do pagamento', () => {
            
            //Arrange
            const servicoDePagamento = new ServicoDePagamento();

            //Act
            servicoDePagamento.pagar('789456123', 'Empresa XPTO', 75.50);

            const pagamento = servicoDePagamento.consultarUltimoPagamento();

            //Assert
            expect(pagamento).to.deep.equal({
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

         it('deve retornar null quando não houver pagamentos', () => {

            //Act
            const servicoDePagamento = new ServicoDePagamento();

            //Assert
            expect(servicoDePagamento.consultarUltimoPagamento()).to.be.null;
        })

         it('deve retornar todos os pagamentos cadastrados', () => {
            //Act
            const servicoDePagamento = new ServicoDePagamento();
            servicoDePagamento.pagar('111', 'Empresa A', 50);
            servicoDePagamento.pagar('222', 'Empresa B', 200);

            const pagamentos = servicoDePagamento.consultar();

            expect(pagamentos).to.have.lengthOf(2);

            expect(pagamentos[0]).to.deep.equal({
                codigoBarras: '111',
                empresa: 'Empresa A',
                valor: 50,
                categoria: 'padrão'
            });

            expect(pagamentos[1]).to.deep.equal({
                codigoBarras: '222',
                empresa: 'Empresa B',
                valor: 200,
                categoria: 'cara'
            });

    })


})
})
