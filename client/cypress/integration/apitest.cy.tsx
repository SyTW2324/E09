describe('Api Test', () => { 

  context("DELETE /users", () => {
    it("gets a list of users", () => {
      cy.request("DELETE", "http://localhost:64333/users", {username: "johnA"}).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.be.eq("John")
      })
    })
  })

  context("GET /users", () => {
    it("gets a list of users", () => {
      cy.request("GET", "http://localhost:64333/users").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).length.to.be.greaterThan(1)
      })
    })
  })

  context("POST /users", () => {
    it("gets a list of users", () => {
      cy.request("POST", "http://localhost:64333/users", {
        "name": "John",
        "surname": "A",
        "username": "johnA",
        "password": "Abcd5",
        "email": "john.doe@example.com",
        "dni": "12345678F",
        "image": "https://example.com/johndoe.jpg"
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.name).to.be.eq("John")
      })
    })
  })
})


