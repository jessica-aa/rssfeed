import cors from "cors";
import express from "express";
import RSSParser from "rss-parser";

const feedURL = "https://sujanadk.substack.com/feed";
const parser = new RSSParser();

let articles = [];

const parse = async url => {
  const feed = await parser.parseURL(url);
  feed.items.forEach(item => {
    articles.push(item);
  });
}

parse(feedURL);

let app = express();
app.use(cors());

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get('/', (req, res) => {
   res.send(articles);
});

app.get('/about', (req, res) => {
  res.send('This is my about route..... ');
});

// Export the Express API
export default app;
