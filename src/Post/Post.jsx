import React from 'react'
import './Post.css'
import Axios from 'axios'
import fire from '../Firebase'
import PostCard from '../PostCard/PostCard'
class Post extends React.Component
{
    state={
        title:'',
        post:'',
        posts:[],
        keys:[]
    }
   
    onSubmitHandler=()=>
{   
        const array=[]
        array.push(this.state)
        const uid= localStorage.getItem('uid') || 1
        if(uid===1 || (this.state.title==='' && this.state.post===''))
        return console.log("no uid in local storage")
        if(this.state.title!=='' && this.state.post!=='')
        fire.database().ref("users/"+uid+"/posts/").push({
            title:this.state.title,
            post:this.state.post
        })
        // fire.database().ref("users/"+uid+"/posts").on('value',(snapshot)=>{
        //     console.log(snapshot.val())})


            // from here
            if(uid===1)
            return console.log("login first")
            let xyz={}
            fire.database().ref("users/"+uid+"/posts").on('value',(snapshot)=>{
                xyz=snapshot.val()
            })
            let array1=[]
            let len = Object.keys(xyz)
            let i
            for(i=0;i<len.length;i++)
            {
                let key = len[i]
                array1[i]= xyz[key]
            }
            this.setState({posts:array1})
            this.setState({keys:Object.keys(xyz)})
            document.getElementById('title-field').value=''
            document.getElementById('body-field').value=''
        
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
        const uid= localStorage.getItem('uid') || 1
        if(uid===1)
        return console.log("login first")
        let xyz={}
        fire.database().ref("users/"+uid+"/posts").on('value',(snapshot)=>{
            xyz=snapshot.val()
        })
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
        this.setState({posts:array})
        this.setState({keys:Object.keys(xyz)})
    }
    

    render()
    {
        let renderCards=null
        if((this.state.posts).length!==0)
        renderCards= <PostCard updateArray={this.getPost} postArray={this.state.posts} keys={this.state.keys}></PostCard>
        return(
            <div>
                Title: <input id='title-field' onChange={this.inputHandler}></input>
                <br></br>
                Body: <textarea id='body-field'onChange={this.inputHandler} className="text-area"></textarea><br></br>
                <button onClick={this.onSubmitHandler} type='submit'>Post</button>
                <button onClick={this.getPost}>Get Posts</button>
                {renderCards}
            </div>
        )
    }
}
export default Post