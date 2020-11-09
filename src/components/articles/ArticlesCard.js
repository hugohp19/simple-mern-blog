import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { FcAcceptDatabase } from 'react-icons/fc';
import { useHistory } from 'react-router-dom';

// const Article = () => { // becomes:
const ArticleCard = ({indArticle, setUpdateArticle, updateArticle}) => {

  let history = useHistory();
  const deletetext = (e) =>{
    e.preventDefault()
    //console.log(e.target.id)
      fetch(`/articles/${e.target.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          alert('Article successfully deleted')
          setUpdateArticle(updateArticle + 1)
          history.push(`/articles/`)
        }
      })
        .catch(error => alert(error))
 }


  return (
    <Toast style={{width: '500px', marginTop:'15px'}}>
      <div className='title-container'>
        <div>
          <FcAcceptDatabase />
          <strong className="mr-auto" style={{paddingLeft:'5px'}}>{indArticle.title}</strong>
        </div>
        <input type='submit' value='X' className='title-container-delete-button' id={indArticle._id} onClick={deletetext}/>
      </div>
    <Toast.Body>{indArticle.text}</Toast.Body>
  </Toast>
  )
}

export default ArticleCard;



