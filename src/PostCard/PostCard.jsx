import PostCardRender from "./PostCardRender"

const PostCard=(props)=>{
    return(
        <div>
            {props.postArray.map((post,index)=>{
                return <PostCardRender key={index} updateArray={props.updateArray} keycheck={props.keys[index]} postIt={post}></PostCardRender>
            })}
            
        </div>
    )
}
export default PostCard