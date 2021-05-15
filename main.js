const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

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

const getAllArticles = (req, res) => {
  res.status(200);
  res.json(articles);
};
app.get("/articles", getAllArticles);

const getAnArticleById = (req, res) => {
  const id1 = req.params.id;
  
  const found = articles.find((elem, i) => {
    //return elem.id ===Number(id1)
    return elem.id ==id1
  });
  console.log(found)
  if (found) {
    
    console.log("yes")
    res.status(200);
    res.json(found);
  }else{
      console.log("no")
      res.status(404);
      res.json("not-found")
  }

  
};
app.get("/articles/:id", getAnArticleById);


app.listen(port, () => {
  console.log(`server run on ${port}`);
});
