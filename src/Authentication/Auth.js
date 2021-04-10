import React from 'react'
import Firebase from 'firebase'
import fire from '../Firebase';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './Auth.css'
import google from './google.png'
class Auth extends React.Component
{
    state={
        uid:'',
        name:'',
        email:'',
        shouldLogIn:true,
        loggedOut:false,
        spinner:false
    }
    componentDidMount=()=>
    {
  
        const uid= localStorage.getItem("uid")
        console.log(uid)
        if(uid!==null && uid!=="1")
        {
            this.setState({spinner:true})
            fire.database().ref('users/'+uid+"/email").on('value',(snapshot)=>{
                const email=snapshot.val()
                this.setState({uid:uid,email:email,shouldLogIn:false})
            })
            fire.database().ref('users/'+uid+"/userName").on('value',(snapshot)=>{
                const name=snapshot.val()
                this.setState({name:name})
            })
            this.setState({spinner:false})
        }
        else
        this.setState({shouldLogIn:true})        
    }

    onSubmit=()=>
    {  
       this.setState({spinner:true}) 
        var provider = new Firebase.auth.GoogleAuthProvider();
        Firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      this.setState({uid:user.uid,name:user.displayName,email:user.email})
      localStorage.setItem("uid",user.uid)
      this.setState({shouldLogIn:false})
      fire.database().ref('users/'+user.uid).update(
          {
              userName:user.displayName,
              email:user.email
          }
      ) 
      const uid= localStorage.getItem("uid")
      if(uid!==null && uid!=="1")
      this.setState({spinner:false})
    }).catch((error) => {
     console.log(error)
  });

    }
    getPhoneNumberFromUserInput=()=>{
        return document.getElementsByClassName('mobNumber')
    }


    onSignout=()=>{

                
        Firebase.auth().signOut().then(() => {

            this.setState(
                {
                    uid:'',
                    name:'',
                    email:''
                })
                localStorage.setItem("uid",1)
                this.setState({shouldLogIn:true,loggedOut:true})
            
          }).catch((error) => {
            // An error happened.
          });
    }

    render()
    {
        let name=null
        let login=null
        let logout=null
        let redirect=null
        let spinner=null


        if(this.state.name!=='' && this.state.name!==null)
        name=<div className='welcomemsg'>
            <p>Welcome {this.state.name}</p>
            </div>
   
        if(this.state.shouldLogIn)
            login=
                    <div className='loginPage'>
                        <p className='loginText'>Lets login first</p>
                        <Link className="login"
                        onClick={this.onSubmit}>
                        <img className='icon' src={google}></img>
                        Login with Google
                        </Link>
                    </div> 
                    
                    

        if(!this.state.shouldLogIn && this.state.email!==null && this.state.email!=='')
            logout=<Link className='logout' onClick={this.onSignout}>Log Out</Link>

        
        if(this.state.shouldLogIn===false)
            redirect= <Redirect to='/posts'></Redirect>
        
        if(this.state.spinner)
            spinner=<Spinner></Spinner>

        if(this.state.loggedOut===true)
        redirect= <Redirect to='/login'></Redirect>
        
        return (
            <div className='authPage'>
                {login}
                {spinner}
                {name}
                {logout}
                {redirect}
            </div>
        )
    }
}

export default Auth