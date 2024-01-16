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
    });
    it("Create an user 2", () => {
      cy.request("POST", "http://localhost:64333/users", {
        "name": "Alex",
        "surname": "Rojas",
        "username": "ketewin",
        "password": "Abcde5",
        "email": "b@mail.com",
        "dni": "00000000B"
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.name).to.be.eq("Alex")
      })
    })
  })

  context("GET /users", () => {
    it("gets a list of users", () => {
      cy.request("GET", "http://localhost:64333/users").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
      })
    })
    it("gets an specific users", () => {
      cy.request("GET", "http://localhost:64333/users/00000000A").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.dni).to.be.eq("00000000A")
      })
    })
  })

  let token = "";
  let token2 = "";


  context("POST /users/login", () => {
    it("login with user", () => {
      cy.request({
        method: "POST", 
        url: "http://localhost:64333/users/login", 
        body: {
          "password": "Abcde5",
          "email": "a@mail.com"
        }
      }).then((response) => {
        token = response.body.authToken;
        expect(response.status).to.eq(200)
        expect(response.body.user.dni).to.be.eq("00000000A")
        expect(response.body.authToken).not.to.be.equal(null)
      })
    })
    it("login with user 2", () => {
      cy.request({
        method: "POST", 
        url: "http://localhost:64333/users/login", 
        body: {
          "password": "Abcde5",
          "email": "b@mail.com"
        }
      }).then((response) => {
        token2 = response.body.authToken;
        expect(response.status).to.eq(200)
        expect(response.body.user.dni).to.be.eq("00000000B")
        expect(response.body.authToken).not.to.be.equal(null)
      })
    })
  })

  context("PATCH /users", () => {
    it("patch user", () => {
      cy.request({
        method: "PATCH", 
        url: "http://localhost:64333/users/00000000A", 
        body: {
          "username": "johnABCDE"
        },
        auth: {
          "bearer": token
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.username).to.be.eq("johnABCDE")
      })
    })
  })
    
  let place_id = "";
  context("POST /places", () => {
    it("Create a place", () => {
      cy.request({
        method: "POST", 
        url: "http://localhost:64333/places", 
        body: {
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
        },
        auth: {
          "bearer": token
        }
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

  let reserve_id = ""
  context("POST /reserves", () => {
    it("Create a reserve", () => {
      cy.request({
        method: "POST", 
        url: "http://localhost:64333/reserves", 
        body: {
          "houseId": place_id,
          "userDni":" 00000000B",
          "enterDate": "2020-01-05",
          "exitDate": "2020-01-05",
        },
        auth: {
          "bearer": token2
        }
      }).then((response) => {
        reserve_id = response.body._id;
        expect(response.status).to.eq(201)
        expect(response.body.houseId).to.be.eq(place_id)
      })
    })
  })

  context("GET /reserves", () => {
    it("gets a list of reserves", () => {
      cy.request("GET", "http://localhost:64333/reserves").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
      })
    })
    it("gets a list of reserves from a user", () => {
      cy.request("GET", "http://localhost:64333/reserves?userDni=00000000B").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
      })
    })
    it("gets a list of reserves from a place", () => {
      cy.request("GET", "http://localhost:64333/reserves?placeId="+place_id).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
      })
    })
    it("gets an specific reserves", () => {
      cy.request({
        method:"GET", 
        url:"http://localhost:64333/reserves/"+reserve_id,
        auth: {
          "bearer": token2
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.userDni).to.be.eq("00000000B")
      })
    })
  })

  context("DELETE /reserves", () => {
    it("delete an specific reserves", () => {
      cy.request({
        method: "DELETE", 
        url: "http://localhost:64333/reserves/"+reserve_id,
        auth: {
          "bearer": token2
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.userDni).to.be.eq("00000000B")
      })
    })
  })

  context("DELETE /places", () => {
    it("delete an specific of places", () => {
      cy.request({
        method: "DELETE", 
        url: "http://localhost:64333/places/"+place_id,
        auth: {
          "bearer": token
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.country).to.be.eq("España")
      })
    })
  })

  context("DELETE /users", () => {
    it("delete a user", () => {
      cy.request({
        method: "DELETE", 
        url: "http://localhost:64333/users/00000000A",
        auth: {
          "bearer": token
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.be.eq("John")
      })
    })
    it("delete a user", () => {
      cy.request({
        method: "DELETE", 
        url: "http://localhost:64333/users/00000000B",
        auth: {
          "bearer": token2
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.be.eq("Alex")
      })
    })
  })
})


