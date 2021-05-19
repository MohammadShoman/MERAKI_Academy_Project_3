const express = require("express");
const app = express();
const db = require("./db");
const { User, Article, Comment } = require("./schema");
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
  Article.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
app.get("/articles", getAllArticles);

//--------------------------------------------------------//
const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;

  Article.find({ author: author })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  /*
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
  }*/
};
app.get("/articles/search_1", getArticlesByAuthor);
//--------------------------------------------------------//
const getAnArticleById = async (req, res) => {
  const id1 = req.params.id;

  Article.find({ author: id1 })
    .populate("author", "firstName")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });

  /*
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
  }*/
};
app.get("/articles/:id", getAnArticleById);

//--------------------------------------------------------//

const createNewArticle = (req, res) => {
  const { title, description, author } = req.body;
  const newArticle = new Article({ title, description, author });
  newArticle
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
app.post("/articles", createNewArticle);
//--------------------------------------------------------//
const updateAnArticleById = (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  Article.findOneAndUpdate(
    { author: id },
    { title, description },
    { new: true }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });

  /*console.log("aaaaa");
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
  }*/
};

app.put("/articles/:id", updateAnArticleById);
//--------------------------------------------------------//
const deleteArticleById = (req, res) => {
  const id = req.params.id;
  Article.findOneAndDelete({ _id: id })
    .then((result) => {
      console.log(result);
      if (result !== null) {
        res.status(200).json({
          success: true,
          message: `Success Delete article with id => ${id}`,
        });
      } else {
        res.status(404).json("not-found");
      }
    })

    .catch((err) => {
      res.status(404).json(err);
    });

  /*console.log("aaaaa");
  const deletedArticle = req.params.id;
  const object = {};
  let index;
  let found = articles.find((elem, i) => {
    index = i;
    return elem.id == deletedArticle;
  });

  if (found) {
    articles.splice(index, 1);
    object.success = true;
    object.message = `Success Delete article with id => ${deletedArticle}`;
    res.status(200);
    res.json(object);
  } else {
    res.status(404);
    res.json("not-found");
  }*/
};
app.delete("/articles/:id", deleteArticleById);

//--------------------------------------------------------//

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;
  Article.deleteMany({ author: author })
    .then((result) => {
      console.log(result);
      if (result !== null) {
        res.status(200).json(result);
      } else {
        res.status(404).json("not-found");
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  /*
  const deletedArticle = req.body.author;
  const object = {
    success: true,
    massage: `Success delete all the articles for the author => ${deletedArticle}`,
  };

  let found = articles.filter((elem, i) => {
    return elem.author === deletedArticle;
  });
  if (found.length > 0) {
    res.status(200);
    res.json(object);
    articles.map((elem, i) => {
      if (elem.author === deletedArticle) {
        articles.splice(i, 1);
      }
    });
  } else {
    res.status(404);
    res.json("not found");
  }*/
};
app.delete("/articles", deleteArticlesByAuthor);
//--------------------------------------------------------//
const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const user = new User({ firstName, lastName, age, country, email, password });
  user
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
app.post("/users", createNewAuthor);
//--------------------------------------------------------//
const login = async (req, res) => {
  const { email, password } = req.body;
  let exist;
  await User.find({ email, password })
    .then((result) => {
      exist = result;
    })
    .catch((err) => {
      res.json(err);
    });
  if (exist.length > 0) {
    res.status(200).json("Valid login credentials");
  } else {
    res.status(401).json("Invalid login credentials");
  }
};
app.post("/login", login);
//--------------------------------------------------------//

const createNewComment = (req, res) => {
  const id = req.params.id;
  const { comment, commenter } = req.body;
  const co = new Comment({ comment, commenter });
  let commentId;

  co.save()
    .then((result) => {
      commentId = result._id;

      Article.updateOne({ _id: id }, { $push: { comments: commentId } }).then(
        () => {
          res.json(result);
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
};

app.post("/articles/:id/comments", createNewComment);
//--------------------------------------------------------//
app.listen(port, () => {
  console.log(`server run on ${port}`);
});
