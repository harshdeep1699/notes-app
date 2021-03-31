import React from 'react'
import './Post.css'
import Axios from 'axios'
class Post extends React.Component
{
    state={
        post:{
            title:null,
            body:null
        }
    }
    onSubmitHandler=()=>
    {
        if(this.state.post.title===null || this.state.post.title==='')
        return alert("enter valid title")
        if(this.state.post.body===null || this.state.post.body==='')
        return alert("enter valid description")
        else
        Axios.post("https://notes-app-59fe7-default-rtdb.firebaseio.com/posts.json",this.state.post)
    }
    inputHandler=(e)=>
    {
        if(e.target.id==='title-field')
        {
            let xyz= this.state.post
            xyz.title=e.target.value
            this.setState({post:xyz})
        }
        if(e.target.id==='body-field')
        {
            let xyz= this.state.post
            xyz.body=e.target.value
            this.setState({post:xyz})
        }  
}
    render()
    {
        return(
            <div>
                Title: <input id='title-field' onChange={this.inputHandler}></input>
                <br></br>
                Body: <textarea id='body-field'onChange={this.inputHandler} className="text-area"></textarea><br></br>
                <button onClick={this.onSubmitHandler} type='submit'>Post</button>
            </div>
        )
    }
}
export default Post