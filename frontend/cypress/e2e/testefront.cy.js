describe("Teste do botao de cadastro", () => {
  it("Teste de criação de usuário com sucesso", () => {
    cy.visit('http://localhost:5173/')
    cy.get(':nth-child(4) > .inline-flex').click()
  })
})
