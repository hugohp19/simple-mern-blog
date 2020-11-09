import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ArticleEdit = ({history}) => {
  const initialState = { title: '', text: '' }
  const [values, setValues] = useState(initialState);

  const handleSubmit = e => {
      e.preventDefault()
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

  return (
    <div className='add-text-container'>
      <h2>Add a Article</h2>
     <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title of your article..." required={true} onChange={e => setValues({...values, title: e.target.value})}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Text for your article..." required={true} onChange={e => setValues({...values, text: e.target.value})}/>
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

export default ArticleEdit;
