import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import geocode from "./src/utils/geocode.js";
import forecast from "./src/utils/forecast.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const app = express();
const publicDirectory = path.join(dirName, "../public");
const viewsPath = path.join(dirName, "../templates/views");
const partialsPath = path.join(dirName, "../templates/partials");
const port = process.env.PORT || 3000

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather APP",
    name: "Aser Amr",
    bottomText: "Created by Aser Amr",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the weather",
    name: "Aser Amr",
    bottomText: "Created by Aser Amr",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is help page",
    title: "Aser Amr",
    bottomText: "Created by Aser Amr",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  
  if (!address) {
    return res.send({
      error: "You must provide a search term",
    });
  } 

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      
      res.send({
        address: address,
        forecast: forecastData,
      });
    });
  });
});


app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term  ",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*splat", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aser Amr",
    errorMessage: "Help article not found",
  });
});

app.get("*splat", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aser Amr",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
