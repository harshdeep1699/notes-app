import { Link, Redirect } from "react-router-dom"

const WelcomePage=()=>{
    return(
        <div>
            Welcome to notes.
            <Link to='/login'>Lets get Started</Link>
        </div>
    )
}

export default WelcomePage