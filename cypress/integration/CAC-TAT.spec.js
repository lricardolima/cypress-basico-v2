// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />


describe('Central de Atendimento TAT', function () {
   
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('Verifica o titulo da Aplicação', () => {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = "teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,"
        cy.get('#firstName').type('Ricardo');
        cy.get('#lastName').type('Souza');
        cy.get('#email').type('ricardo@g.com');
        cy.get('#open-text-area').type(longText, {delay: 0});
        cy.get('button[type="submit').click();

        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = "teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,"
        cy.get('#firstName').type('Ricardo');
        cy.get('#lastName').type('Souza');
        cy.get('#email').type('ricardo!g.com');
        cy.get('#open-text-area').type(longText, {delay: 0});
        cy.get('button[type="submit').click();

        cy.get('.error').should('be.visible');
        
    });

    it('Se campo telefone não conter valor numérico seu valor deve continuar vazio', () => {
       
        cy.get('#phone')
            .type('texto')
            .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Ricardo')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('ricardo@g.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('texte')
        cy.get('button[type="submit').click()

        cy.get('.error').should('be.visible')
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Ricardo')
            .should('have.value', 'Ricardo')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('Souza')
            .should('have.value', 'Souza')
            .clear()
            .should('have.value', '')
        cy.get('#email').type('ricardo@g.com')
            .should('have.value', 'ricardo@g.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('85966885256')
            .should('have.value', '85966885256')
            .clear()
            .should('have.value', '')
       
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit').click()
        cy.get('.error').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.preecheOsCamposObrigatoriosEhEnvia('Ricardo', 'Souza', 'lr@lr.com', '85988989988', 'texto')
        cy.enviarFormulario()
        cy.get('.success').should('be.visible')
    });
    
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.preecheOsCamposObrigatoriosEhEnvia('Ricardo', 'Souza', 'lr@lr.com', '85988989988', 'texto')
        cy.camposSuspensos(4).should('have.value', 'youtube')
        cy.enviarFormulario()

    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
          
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture("example.json").as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    });

   
})