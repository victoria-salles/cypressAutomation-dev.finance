/// <reference types="cypress"/>

context('Dev finances', () => {
  
  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/#')
    cy.get ('#data-table tbody tr').should('have.length', 0);
  });

  it('Cadastrar entradas', () => {
      cy.get('#transaction .button').click();
      cy.get('#description').type('mesada');
      cy.get('[name=amount]').type(12);
      cy.get('[type=date]').type('2023-01-18');
      cy.get('Button').contains('Salvar').click();
  });

  it('Cadastrar saídas', () => {  
      cy.get('#transaction .button').click();
      cy.get('#description').type('mesada');
      cy.get('[name=amount]').type(-12);
      cy.get('[type=date]').type('2023-01-18');
      cy.get('Button').contains('Salvar').click();
  });

  it('Remover entradas e saídas', () => {

      const entrada = 'Mesada'
      const saida = 'Roupa'

      cy.get('#transaction .button').click();
      cy.get('#description').type(entrada);
      cy.get('[name=amount]').type(100);
      cy.get('[type=date]').type('2023-01-18');
      cy.get('Button').contains('Salvar').click();
      cy.get('#transaction .button').click();
      cy.get('#description').type(saida);
      cy.get('[name=amount]').type(-35);
      cy.get('[type=date]').type('2023-01-18');
      cy.get('Button').contains('Salvar').click();

      cy.get('td.description')
        .contains(entrada)
        .parent()
        .find('img[onclick*=remove]')
        .click()

      cy.get('td.description')
        .contains(saida)
        .siblings()
        .children('img[onclick*=remove]')
        .click()  

      cy.get ('#data-table tbody tr').should('have.length', 0);
  });
});