import React from 'react'
import './Post.css'
import Axios from 'axios'
import fire from '../Firebase'
import PostCard from '../PostCard/PostCard'
import { Link, Redirect, Route } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
class Post extends React.Component
{
    state={
        title:'',
        post:'',
        posts:[],
        keys:[],
        spinner:false
    }
   
    onSubmitHandler=()=>
{   
        this.setState({spinner:true})
        const uid= localStorage.getItem('uid') || 1
        if(this.state.title!=='' && this.state.post!=='')
        {
            fire.database().ref("users/"+uid+"/posts/").push({
                title:this.state.title,
                post:this.state.post
                })
                this.getPost()
                // let xyz={}
                // fire.database().ref("users/"+uid+"/posts").on('value',(snapshot)=>{
                //     xyz=snapshot.val()
                // })
                // this.getPost()
                // let array1=[]
                // let len = Object.keys(xyz)
                // let i
                // for(i=0;i<len.length;i++)
                // {
                //     let key = len[i]
                //     array1[i]= xyz[key]
                // }
                // this.setState({keys:Object.keys(xyz),posts:array1,title:'',post:''})
                
            }
            this.setState({spinner:false})
        
    }
    inputHandler=(e)=>
    {
        if(e.target.id==='title-field')
        {

            this.setState({title:e.target.value})
        }
        if(e.target.id==='body-field')
        {
            this.setState({post:e.target.value})
        }  
}
    getPost=()=>
    {
        this.setState({spinner:true})
        const uid= localStorage.getItem('uid') || 1
        if(uid===1)
        return
        let xyz={}
        fire.database().ref("users/"+uid+"/posts").on('value',(snapshot)=>{
            xyz=snapshot.val()
            if(xyz===null)
            xyz={}
            let array=[]
            let len = Object.keys(xyz)
            let i
            for(i=0;i<len.length;i++)
            {
                let key = len[i]
                array[i]= xyz[key]
            }
            this.setState({posts:array,keys:Object.keys(xyz),spinner:false})
        })
        
        
    }
    

    render()
    {
        let renderCards=null
        let spinner=null
        let invalidPost=null
        let postGenerator=null
        if((this.state.posts).length!==0)
        renderCards= <PostCard updateArray={this.getPost} postArray={this.state.posts} keys={this.state.keys}></PostCard>

        if(localStorage.getItem("uid")!=='1' && localStorage.getItem("uid")!==null )
        postGenerator= <div>

            Title: <input maxLength="15" placeholder="Enter title of note" required id='title-field' onChange={this.inputHandler}></input>
            <br></br>
            Body: <textarea maxLength='30' required placeholder='Enter note description' id='body-field'onChange={this.inputHandler} className="text-area"></textarea><br></br>
            <button onClick={this.onSubmitHandler}>Post</button>
            <button onClick={this.getPost}>Get Posts</button>
            </div>

        if(this.state.spinner)
        spinner=<Spinner></Spinner>

        if(this.state.invalidpost)
        {
            invalidPost=<p1>Enter a post DAa</p1>
        }
        return(
            <div className='post'>
                {postGenerator}
                {spinner}    
                {invalidPost}
                {renderCards}
            </div>
        )
    }
}
export default Post