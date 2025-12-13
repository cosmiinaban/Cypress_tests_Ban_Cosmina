class PetAPI {
  
    addPet(petPayload) {
      return cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet',
        body: petPayload,
        failOnStatusCode: false
      });
    }
  
    getPetById(petId) {
      return cy.request({
        method: 'GET',
        url: `https://petstore.swagger.io/v2/pet/${petId}`,
        failOnStatusCode: false
      });
    }

    deletePet(petId) {
        return cy.request({
          method: 'DELETE',
          url: `https://petstore.swagger.io/v2/pet/${petId}`,
          failOnStatusCode: false
        });
      }
  }

  export const petAPI = new PetAPI();