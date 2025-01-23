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
  it("should return the correct movie details for a valid id", async () => {
    const response = await request(app).get("/movies/1"); // Kollar specifikt på första filen
    expect(response.status).toBe(200);
    expect(response.text).toContain("Isle of dogs"); // Kollar om första film sidan innehålller texten Pulp fiction
    expect(response.text).toContain("<img"); // Kollar att en img tagg finns med
    expect(response.text).toContain("<p"); // Kollar om en p tagg finns
  });
});
