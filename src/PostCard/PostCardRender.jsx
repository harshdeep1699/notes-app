import fire from '../Firebase'
import Post from '../Post/Post'
import './PostCardRender.css'

const PostCardRender=(props)=>{
    return(

        <div className='postCard'>
            <p className='title'>{props.postIt.title}</p>
            <p>{props.postIt.post}</p>
            <button className='doneButton' onClick={()=>deletePost(props.keycheck,props.updateArray)}>DONE</button>
        </div>
    )
}
const deletePost=(key,updateArray)=>{
    fire.database().ref("users/"+localStorage.getItem('uid')+'/posts/'+key).remove(()=>{
        updateArray()
    })
    alert("Note Deleted")
}
export default PostCardRender