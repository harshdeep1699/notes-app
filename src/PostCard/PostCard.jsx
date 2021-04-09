import PostCardRender from "./PostCardRender"
import './PostCard.css'
const PostCard=(props)=>{
    return(
        <div className="postCards">
            {props.postArray.map((post,index)=>{
                return <PostCardRender key={index} updateArray={props.updateArray} keycheck={props.keys[index]} postIt={post}></PostCardRender>
            })}
            
        </div>
    )
}
export default PostCard