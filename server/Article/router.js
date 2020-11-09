const express = require('express');
const router = express.Router();
const Article = require('./article.model');


router.get('/', (req, res) => {
  Article.find()
  .then( article => {
    res.status(200).json(article)
  })
  .catch((err) => res.status(500).json('Error: ' + err ))
})

router.get('/:articleId', (request, response) => {
  Article.findById(request.params.articleId, (error, article) => {
    if (error) {
      console.log(error)
      response.status(400).json(error)
    }
    else {
      if (!article) {
        response.sendStatus(410)
      }
      else {
        response.status(200).json(article)
      }
    }
  })
})


router.post('/', (request, response) => {
  Article.create( request.body, (error, article) => {
    if (error) {
      console.log(`Error creating Article, ${new Date()}: ${error}`)
      response.status(400).json(error)
    }
    else {
      response.status(201).json(article)
    }
  })
})

router.put('/:articleId', (req, res) => {
  
  const article = new Article(req.body);
  Article.findByIdAndUpdate(req.params.articleId, 
    {
      title: article.title,
      text: article.text
  },
  function (err) {
    if (err){
      res.status(500).json('Error: ' + err );
    } else {
      res.status(201).json(article);
    }
  });
  
})

router.delete('/:articleId', (req, res) => {
  Article.findByIdAndDelete(req.params.articleId)
  .then((article) =>{
    if(!article){
      return res.status(404).json('Error: Article not found')
    }
    // returns a 204 with the document in question
    res.status(204).json(article)
  })
  .catch((err) => res.status(505).json('Error: ' + err ));
})



module.exports = router;