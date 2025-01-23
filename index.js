import express from "express";
import path from "path";
import morgan from "morgan";
import fetch from "node-fetch";
import { marked } from "marked";
import { TextDecoder } from "util";
global.TextDecoder = TextDecoder;

const app = express();
const port = 5080;

app.set("view engine", "ejs");
//Berättar var alla filer finns
app.set("views", path.join(path.resolve(), "views"));

// Servar statiska filer från public mappen
app.use(express.static(path.join(path.resolve(), "public")));

//Middleware som loggar nice info :)
app.use(morgan("tiny"));

// fetchar från API när request görs till startsidan
app.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://plankton-app-xhkom.ondigitalocean.app/api/movies"
    );
    const { data } = await response.json();
    res.render("index.ejs", { movies: data });
    console.log(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Could not fetch movies");
  }
});

// Skapar en route när man gör request till /movies följd av ett id, ":" gör det dynamiskt och tillåter att ansöka med olika värden
app.get("/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(
      `https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`
    );

    // Berättar om filmen inte hittas
    if (!response.ok) {
      return res.status(404).send("<h1>Movie not found!</h1>");
    }

    const { data } = await response.json();

    //Läser markdown språk och konverterar till html
    const markedIntro = marked(data.attributes.intro);

    res.render("movie.ejs", {
      title: data.attributes.title,
      img: data.attributes.image.url,
      description: markedIntro,
    });

    console.log(data);
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
});

//Renderar moviesPage
app.get("/moviesPage", (req, res) => {
  res.render("moviesPage.ejs");
});

// Startar servern

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
  });
}

export default app;
