import React, {useState, useEffect} from 'react';
import './Article.css';
import ArticlesCard from './ArticlesCard.js';
import {Link} from 'react-router-dom';

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
            <Link to={`/articles/${indArticle._id}/edit` } key={index}><ArticlesCard  indArticle = {indArticle} setUpdateArticle={setUpdateArticle} updateArticle= {updateArticle}/></Link>
          )
        })}
      </div>
    </div>
  )
}

export default Articles;