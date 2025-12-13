import { petAPI } from '../support/api/pet';

describe('Pet API tests', () => {
    
    let petId;

    beforeEach(() => {
      petId = Date.now(); 
    });
  

    const validPet = {
        id: petId,
        category: { id: 1, name: 'Dogs' },
        name: 'Bruno',
        photoUrls: ['https://www.animalele.ro/wp-content/uploads/2021/12/rasa-de-caine-labrador.jpg'],
        tags: [{ id: 1, name: 'happy' }],
        status: 'available'
    };

    const invalidPet = {
        biscuits: 2,
        category: { id: 2, name: 'Dog' },
        photoUrls: ['url'],
        tags: [{ id: 2, name: 'Happy' }],
        status: 'available'
    };

    it('Adds a valid pet', () => {
        petAPI.addPet(validPet).then(res => {
            expect(res.status).to.eq(200);
            expect(res.body.name).to.eq(validPet.name);
        });
    });

    it('Adds invalid pet', () => {
        petAPI.addPet(invalidPet).then(res => {
            expect(res.status).to.eq(405);
        });
    });    //this test is failing - it shouldn't allow Post of any data

    it('Adds pet with existing ID', () => {
        petAPI.addPet(validPet).then(res => {
            expect(res.status).to.eq(200); //adds pet
            const updatedPet = { ...validPet, name: 'Adog' };
            petAPI.addPet(updatedPet).then(res2 => {
              expect(res2.status).to.eq(200);    //adds pet with the same ID
              expect(res2.body.name).to.eq('Adog');
            });
        });
    });

    it('GET pet by valid ID', () => {
        const pet = {
          id: petId,
          category: { id: 1, name: 'Dogs' },
          name: 'Harry',
          photoUrls: ['https://www.animalele.ro/wp-content/uploads/2021/12/rasa-de-caine-labrador.jpg'],
          tags: [{ id: 1, name: 'cute' }],
          status: 'available'
        };
        petAPI.addPet(pet).then(() => {
          petAPI.getPetById(petId).then(res => {
            expect(res.status).to.eq(200);
            expect(res.body.id).to.eq(petId);
            expect(res.body.name).to.eq('Harry');
            petAPI.deletePet(petId);
          });
        });
      });
    
      it('GET pet by non-existent ID', () => {
        const invalidId = 99999999;
        petAPI.getPetById(invalidId).then(res => {
          expect(res.status).to.eq(404);
        });
      });
    
      it('GET pet after deletion', () => {
        const pet = {
          id: petId,
          category: { id: 2, name: 'Cats' },
          name: 'Puffy',
          photoUrls: ['https://placekitten.com/200/200'],
          tags: [{ id: 2, name: 'cute' }],
          status: 'available'
        };
        petAPI.addPet(pet).then(() => {
          petAPI.deletePet(petId).then(() => {
            petAPI.getPetById(petId).then(res => {
              expect(res.status).to.eq(404);
            });
          });
        });
      });
  

});
