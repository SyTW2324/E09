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
  })
    
  let place_id = "";
  context("POST /places", () => {
    it("Create a place", () => {
      cy.request("POST", "http://localhost:64333/places", {
        "ownerDni": "00000000A",
        "address": "c/Josefa 22, bajo A",
        "bedrooms": 2,
        "bathrooms": 1,
        "squareFeet": 80,
        "rentAmount": 34,
        "isAvailable": true,
        "location": {
          latitude: 28.483159,
          longitude: -16.321562,
        },
        "country": "España"
      }).then((response) => {
        place_id = response.body._id;
        expect(response.status).to.eq(201)
        expect(response.body.bathrooms).to.be.eq(1)
      })
    })
  })

  context("GET /places", () => {
    it("gets a list of places", () => {
      cy.request("GET", "http://localhost:64333/places").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
      })
    })
    it("gets a list of places from a user", () => {
      cy.request("GET", "http://localhost:64333/places?OwnerDni=00000000A").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
      })
    })
    it("gets an specific places", () => {
      cy.request("GET", "http://localhost:64333/places/"+place_id).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.country).to.be.eq("España")
      })
    })
  })

  context("DELETE /places", () => {
    it("delete a list of places", () => {
      cy.request("DELETE", "http://localhost:64333/places/"+place_id,).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.country).to.be.eq("España")
      })
    })
  })

  context("DELETE /users", () => {
    it("delete a list of users", () => {
      cy.request("DELETE", "http://localhost:64333/users/00000000A",).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.be.eq("John")
      })
    })
  })
})


