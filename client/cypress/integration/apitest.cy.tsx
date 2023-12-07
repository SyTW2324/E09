describe('Api Test', () => { 

  context("POST /users", () => {
    it("Create an user", () => {
      cy.request("POST", "http://localhost:64333/users", {
        "name": "John",
        "surname": "ABC",
        "username": "johnABC",
        "password": "Abcde5",
        "email": "a@mail.com",
        "dni": "00000000A"
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.name).to.be.eq("John")
      })
    })
  })

  context("GET /users", () => {
    it("gets a list of users", () => {
      cy.request("GET", "http://localhost:64333/users").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(1)
      })
    })
    it("gets an specific users", () => {
      cy.request("GET", "http://localhost:64333/users/00000000A").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.dni).to.be.eq("00000000A")
      })
    })
  })

  context("POST /users/login", () => {
    it("login with user", () => {
      cy.request("POST", "http://localhost:64333/users/login", {
        "password": "Abcde5",
        "email": "a@mail.com"
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.user.dni).to.be.eq("00000000A")
        expect(response.body.authToken).not.to.be.equal(null)
      })
    })
  })

  context("PATCH /users", () => {
    it("patch user", () => {
      cy.request("PATCH", "http://localhost:64333/users/00000000A", {
        "username": "johnABCDE"
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.username).to.be.eq("johnABCDE")
      })
    })

    context("DELETE /users", () => {
      it("gets a list of users", () => {
        cy.request("DELETE", "http://localhost:64333/users/00000000A",).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.name).to.be.eq("John")
        })
      })
    })
  })
})


