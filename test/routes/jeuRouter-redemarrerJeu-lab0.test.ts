import { assert } from 'console';
import 'jest-extended';
import { jeuRoutes } from '../../src/routes/jeuRouter';
import app from '../../src/app';
import supertest from 'supertest';

const request = supertest(app);
const joueur1 = "Sponge"
const joueur2 = "Patrick"

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async ()=>{
    const response1 = await request.post('/api/v1/jeu/demarrerJeu').send({
      nom: joueur1
    });
    expect(response1.statusCode).toBe(201);
    const response2 = await request.post('/api/v1/jeu/demarrerJeu').send({
      nom: joueur2
    })
    expect(response2.statusCode).toBe(201);
  });
  it("redemarrerJeu avec succes",async()=>{
    const response = await request.get("/api/v1/jeu/redemarrerJeu");
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  })
  it("aucun joueur apres avoir redemarrer le jeu", async ()=>{
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  })
});
