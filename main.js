const express = require("express");
const app = express();
const port = 5000;
const { uuid } = require("uuidv4");
app.use(express.json());
//--------------------------------------------------------//
const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];
//--------------------------------------------------------//
const getAllArticles = (req, res) => {
  res.status(200);
  res.json(articles);
};
app.get("/articles", getAllArticles);

//--------------------------------------------------------//
const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;
  const found = articles.filter((elem, i) => {
    return elem.author === author;
  });
  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("not found");
  }
};
app.get("/articles/search_1", getArticlesByAuthor);
//--------------------------------------------------------//
const getAnArticleById = (req, res) => {
  const id1 = req.params.id;

  const found = articles.find((elem, i) => {
    //return elem.id ===Number(id1)
    return elem.id == id1;
  });
  console.log(found);
  if (found) {
    console.log("yes");
    res.status(200);
    res.json(found);
  } else {
    console.log("no");
    res.status(404);
    res.json("not-found");
  }
};
app.get("/articles/:id", getAnArticleById);

//--------------------------------------------------------//

const createNewArticle = (req, res) => {
  const newArticle = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    id: uuid(),
  };
  articles.push(newArticle);
  res.status(201);
  res.json(newArticle);
};
app.post("/articles", createNewArticle);
//--------------------------------------------------------//
const updateAnArticleById = (req, res) => {
  console.log("aaaaa");
  const updatedArticle = req.params.id;
  let index;
  let found = articles.find((elem, i) => {
    index = i;
    return elem.id == updatedArticle;
  });

  if (found) {
    articles[index] = {
      id: updatedArticle,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
    };
    res.status(200);
    res.json(articles[index]);
  } else {
    res.status(404);
    res.json("not-found");
  }
};

app.put("/articles/:id", updateAnArticleById);
//--------------------------------------------------------//

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
