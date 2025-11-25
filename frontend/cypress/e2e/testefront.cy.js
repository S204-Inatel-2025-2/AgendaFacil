describe("Teste página inicial", () => {
  it("Teste página inicial", () => {
    cy.visit('/')
    cy.get('.text-4xl')
      .should('be.visible')
      .and('contain', 'Agende seus serviços com facilidade')
  })
})

describe("Teste de criação de cadastro", () => {
  it("Verifica se o usuário já é cadastrado", () => {
    cy.visit('/')

    cy.contains('button', 'Cadastrar').click()

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
    //cy.get('.p-3').contains('Erro no cadastro. Tente novamente')
  })
})


describe("Teste login", () => {

  it("deve fazer login com credenciais válidas", () => {
    cy.visit('/')
    cy.contains('Entrar').click()
    cy.get('.text-2xl')
      .should('be.visible')
      .and('contain', 'Entrar na sua conta')
    cy.intercept('POST', '/api/login').as('loginRequest')
    cy.get('#email').type('marcelo123@email.com')
    cy.get('#senha').type('senha123')
    cy.get('.space-y-6 > .inline-flex').click()
    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 200)
    cy.contains('Entrar na sua conta').should('not.exist')
    cy.contains(/meus agendamentos/i).should('be.visible')
  })
})

describe("Teste meus agendamentos", () => {
  it("deve abrir a seção Meus Agendamentos após login", () => {
    cy.visit('/')
    cy.contains('Entrar').click()
    cy.intercept('POST', '/api/login').as('loginRequest')
    cy.get('#email', { timeout: 10000 })
      .should('be.visible')
      .type('marcelo123@email.com')
    cy.get('#senha').type('senha123')
    cy.get('.space-y-6 > .inline-flex').click()
    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 200)
    cy.contains('Meus Agendamentos').click()
    cy.contains(/meus agendamentos/i).should('be.visible')
  })
})

describe("Teste consultas médicas", () => {
  it("Deve abrir a página de consultas médicas", () => {
    cy.visit('/');

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
    cy.visit('/');

    cy.get('.space-x-8 > :nth-child(3)').click();

    cy.get('#email', { timeout: 10000 }).should('be.visible').type('marcelo123@email.com');
    cy.get('#senha').type('senha123');
    cy.get('.space-y-6 > .inline-flex').click();
    cy.wait(2000);
    cy.get('.lg\\:grid-cols-2 > :nth-child(2) > .grid > :nth-child(2) > .text-card-foreground > .relative').click({ force: true })
    cy.get(':nth-child(2) > .text-xl')

  });

});

describe("Teste de criação de cadastro de empresa", () => {
  it("Verifica se a empresa já é cadastrada", () => {
    cy.visit('/')

    cy.contains('button', 'Cadastrar').click()

    cy.get('.text-2xl')
      .should('be.visible')
      .and('contain', 'Crie sua conta')

    cy.get('.bg-muted\\/50 > .text-muted-foreground').click({ force: true })
    cy.get('#empresa-nome').type('teste', { force: true })
    cy.get('#empresa-email').type('teste@gmail.com')
    cy.get('#empresa-phone').type('3599999999')
    cy.get('#cnpj').type('24.492.886/0001-04')
    cy.get('#password').type('123456789')
    cy.get('#confirmPassword').type('123456789')
    cy.get('#terms').click()
    cy.get('.space-y-6 > .inline-flex').click()
    //cy.get('.go2072408551').contains('Dados da empresa encontrados!')
  })
})

// describe("Teste cadastrar meus serviços", () => {

//   it("cadastrar serviços", () => {
//     cy.visit('/')

//     // LOGIN
//     cy.contains('Entrar').click()

//     cy.get('.text-2xl')
//       .should('be.visible')
//       .and('contain', 'Entrar na sua conta')

//     cy.intercept('POST', '/api/login').as('loginRequest')

//     cy.get('#email').type('marcelo123@email.com')
//     cy.get('#senha').type('senha123')
//     cy.contains('button', 'Entrar').click()

//     cy.wait('@loginRequest')
//       .its('response.statusCode')
//       .should('eq', 200)

//     // ENTRAR NO FORMULÁRIO DE SERVIÇOS
//     cy.contains('Cadastrar meus serviços').click({ force: true })

//     //
//     // --- CAMPOS DO FORMULÁRIO ---
//     //

//     // Nome do estabelecimento
//     cy.get('input[data-slot="input"]').eq(0)
//       .type('salao teste', { force: true })

//     // Descrição geral
//     cy.get('.resize-none').first()
//       .type('salao teste', { force: true })

//     // CATEGORIA
//     cy.contains('Categoria')
//       .parent()                       // pega o grupo
//       .find('select')                 // encontra o select
//       .select('Beleza & Estética', { force: true })

//     // Local do atendimento
//     cy.contains('Local do atendimento')
//       .parent()
//       .find('input')
//       .type('salao teste', { force: true })

//     // Disponibilidade
//     cy.contains('Disponibilidade geral')
//       .parent()
//       .find('input')
//       .type('seg-sex, 10h-18h', { force: true })

//     // Tags
//     cy.contains('Tags / Especialidades')
//       .parent()
//       .find('input')
//       .type('corte cabelo', { force: true })

//     //
//     // --- ADICIONAR SERVIÇO ---
//     //

//     // Nome do serviço
//     cy.contains('Nome do serviço')
//       .parent()
//       .find('input')
//       .type('salao teste', { force: true })

//     // Preço
//     cy.contains('Preço')
//       .parent()
//       .find('input')
//       .type('120', { force: true })

//     // Descrição do serviço
//     cy.contains('Descrição do serviço')
//       .parent()
//       .find('textarea')
//       .type('teste', { force: true })

//     // Duração
//     cy.contains('Duração')
//       .parent()
//       .find('input')
//       .type('30', { force: true })

//     // Botão “Adicionar serviço”
//     cy.contains('Adicionar serviço').click({ force: true })

//     // Confirmação
//     cy.contains('Serviço adicionado!').should('be.visible')

//   })
// })