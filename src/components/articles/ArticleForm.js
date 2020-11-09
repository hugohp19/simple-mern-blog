import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ArticleForm = ({history, match}) => {
  const initialState = { title: '', text: '' }
  const [values, setValues] = useState(initialState);
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');


  useEffect(() => {
    fetch(`/articles/${match.params.articleId}`)
      .then(response => response.json())
      .then(article => {setArticle(article)
      //console.log(article);
      setTitle(article.title);
      setText(article.text);
      //console.log(article.title)
      //console.log(title)
    })
      .catch(error => alert(error))
  }, [])

  const handleSubmit = e => {
      e.preventDefault()

      if(match.params.articleId){
        fetch(`/articles/${match.params.articleId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
        .then(response => {
          if (response.ok) {
            alert('Article successfully update')
            return  (
                      history.push(`/articles/${article._id}`)
            )
          }
        })
          .catch(error => alert(error))
      }else{
        fetch('/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
        .then(response => {
          if (response.ok) {
            alert('Article successfully created')
            return  response.json()
                      .then(article => {
                      history.push(`/articles/${article._id}`)
                    })
          }
        })
          .catch(error => alert(error))
      }
    }

  return (
    <div className='add-text-container'>
      <h2>Add a Article</h2>
     <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title of your article..." required={true} value={title} onChange={e => {setValues({...values, title: e.target.value});
        setTitle(e.target.value)
      }}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Text for your article..." required={true} value={text} onChange={e => {setValues({...values, text: e.target.value})
       setText(e.target.value);
      }}/>
      </Form.Group>
      <div className='add-text-button'>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
    </div>
  )
}

export default ArticleForm;
