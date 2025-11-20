describe("Teste página inicial", () => {
  it("Teste página inicial", () => {
    cy.visit('http://localhost:5173/')
    cy.get('.text-4xl')
      .should('be.visible')
      .and('contain', 'Agende seus serviços com facilidade')
  })
})
describe("Teste de criação de cadastro", () => {
  it("Teste do botão de cadastro", () => {
    cy.visit('http://localhost:5173/')
    cy.get(':nth-child(4) > .inline-flex').click()
    cy.get('.text-2xl')
      .should('be.visible')
      .and('contain', 'Crie sua conta')
    cy.get('#name').type('Sabrina Ramos Silveira')
    cy.get('#email').type('sabrina@gmail.com')
    cy.get('#phone').type('3599999999')
    cy.get('#password').type('123456789')
    cy.get('#confirmPassword').type('123456789')
    cy.get('#terms').click()
    cy.get('.space-y-6 > .inline-flex').click()
    cy.get('[style="transform: none;"] > .inline-flex').click()
  })
})

describe("Teste login", () => {
  it("Teste login", () => {
    cy.visit('http://localhost:5173/')
    cy.get('.space-x-4 > :nth-child(3) > .inline-flex').click()
    cy.get('.text-2xl')
      .should('be.visible')
      .and('contain', 'Entrar na sua conta')
    cy.get('#email').type('sabrina@gmail.com')
    cy.get('#senha').type('123456789')
    cy.get('.space-y-6 > .inline-flex').click()
  })

})

describe("Teste meus agendamentos", () => {
  it("Deve abrir a página Meus Agendamentos após login", () => {
    cy.visit('http://localhost:5173/');

    cy.get('.space-x-8 > :nth-child(3)').click();

    cy.get('#email', { timeout: 10000 }).should('be.visible').type('marcelo123@email.com');
    cy.get('#senha').type('senha123');
    cy.get('.space-y-6 > .inline-flex').click();
    cy.wait(2000);
    cy.get('[data-cypress-el="true"]').click();

  });
});

describe("Teste consultas médicas", () => {
  it("Deve abrir a página de consultas médicas", () => {
    cy.visit('http://localhost:5173/');

    cy.get('.space-x-8 > :nth-child(3)').click();

    cy.get('#email', { timeout: 10000 }).should('be.visible').type('marcelo123@email.com');
    cy.get('#senha').type('senha123');
    cy.get('.space-y-6 > .inline-flex').click();
    cy.wait(2000);
    cy.get('.lg\\:grid-cols-2 > :nth-child(2) > .grid > :nth-child(1) > .text-card-foreground > .inset-0').click({ force: true })
    cy.get(':nth-child(2) > .text-xl')


  });
});

describe("Teste beleza e estética", () => {
  it("Deve abrir a página de beleza e estética", () => {
    cy.visit('http://localhost:5173/');

    cy.get('.space-x-8 > :nth-child(3)').click();

    cy.get('#email', { timeout: 10000 }).should('be.visible').type('marcelo123@email.com');
    cy.get('#senha').type('senha123');
    cy.get('.space-y-6 > .inline-flex').click();
    cy.wait(2000);
    cy.get('.lg\\:grid-cols-2 > :nth-child(2) > .grid > :nth-child(2) > .text-card-foreground > .relative').click({ force: true })
    cy.get(':nth-child(2) > .text-xl')

  });
});


