import React, {useState, useEffect} from 'react';
import './Article.css';
import ArticlesCard from './ArticlesCard.js';

// const Article = () => { // becomes:
const Articles = ({match}) => {

  const [article, setArticle] = useState([])
  const [updateArticle, setUpdateArticle] = useState(1)

  useEffect(() => {
    fetch(`/articles`)
      .then(response => response.json())
      .then(article => {
        setArticle(article); 
      })
      .catch(error => alert(error))
  }, [updateArticle])

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Articles</h1>
      <div className='articles-container'>
        {article.map((indArticle, index) => {
          return(
            <ArticlesCard key={index} indArticle = {indArticle} setUpdateArticle={setUpdateArticle} updateArticle= {updateArticle}/>
            // <div key={index}>
            //   <h1>{indArticle.title}</h1>
            //   <p>{indArticle.text}</p>
            // </div>
          )
        })}
      </div>
    </div>
  )
}

export default Articles;