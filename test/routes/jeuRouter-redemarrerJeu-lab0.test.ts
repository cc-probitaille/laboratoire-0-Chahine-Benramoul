import { assert } from 'console';
import 'jest-extended';
import { jeuRoutes } from '../../src/routes/jeuRouter';
import app from '../../src/app';
import supertest from 'supertest';

const request = supertest(app);
const joueur1 = "Sponge"
const joueur2 = "Patrick"

describe("get('/api/v1/jeu/redemarrerJeu')", () => {
  beforeAll(async ()=>{
    const response1 = await request.post('/api/v1/jeu/demarrerJeu').send({
      nom: joueur1
    });
    expect(response1.status).toBe(201);
    const response2 = await request.post('/api/v1/jeu/demarrerJeu').send({
      nom: joueur2
    })
    expect(response2.status).toBe(201);
  });
  it("/api/v1/jeu/redemarrerJeu (redemarrerJeu avec succes)",async()=>{
    const response = await request.get("/api/v1/jeu/redemarrerJeu");
    expect(response.status).toBe(200);
    console.log(response.body);
  })
    it("/api/v1/jeu/joueur (joueur apres redemarrerJeu())", async () => {
    const response1 = await request.get("/api/v1/jeu/redemarrerJeu");
    expect(response1.status).toBe(200);
    const response2 = await request.get("/api/v1/jeu/jouer/");
    expect(response2.status).toBe(404);
    console.log(response2.body);
  });
  it("aucun joueur apres avoir redemarrer le jeu", async ()=>{
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  })
});
