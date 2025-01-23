import request from "supertest";
import app from "../index";

describe("API Tests", () => {
  // Testar startsidan
  it("Should return a list of movies on the homepage", async () => {
    const response = await request(app).get("/"); //Testar start sidan
    expect(response.status).toBe(200); // Förväntar sig en 200 status kod
    expect(response.text).toContain("All Movies"); // Kollar om texten All movies finns på sidan
  });

  // Testar specifika filmer
  it("Should return the correct movie details for a valid id", async () => {
    const response = await request(app).get("/movies/1"); // Kollar specifikt på första filen
    expect(response.status).toBe(200);
    expect(response.text).toContain("Isle of dogs"); // Kollar om första film sidan innehålller texten Pulp fiction
    expect(response.text).toContain("<img"); // Kollar att en img tagg finns med
    expect(response.text).toContain("<p"); // Kollar om en p tagg finns
  });

  // Testar för en film som inte finns
  it("Should return 404 page for movies that doesn't exist in API", async () => {
    const response = await request(app).get("/movies/1337"); // Testar film nummer LEET
    expect(response.status).toBe(404); // Förväntar sig en 404 kod
    expect(response.text).toContain("Movie not found!"); // Kollar att texten finns på sidan
  });

  //Testar att moviesPage sidan laddas
  it("Should return the MoviesPage correctly", async () => {
    const response = await request(app).get("/moviesPage");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Movie production companies we work with");
  });
});
