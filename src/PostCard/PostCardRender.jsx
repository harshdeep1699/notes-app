import fire from '../Firebase'
import Post from '../Post/Post'
import './PostCardRender.css'

const PostCardRender=(props)=>{
    return(

        <div className='postCard'>
            <p>{props.postIt.title}</p>
            <p>{props.postIt.post}</p>
            <button onClick={()=>deletePost(props.keycheck,props.updateArray)}>DONE</button>
        </div>
    )
}
const deletePost=(key,updateArray)=>{
    fire.database().ref("users/"+localStorage.getItem('uid')+'/posts/'+key).remove(()=>{
        updateArray()
    })

}
export default PostCardRender