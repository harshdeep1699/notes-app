import React from 'react'
import Firebase from 'firebase'
import fire from '../Firebase';
class Auth extends React.Component
{
    state={
        uid:'',
        name:'',
        email:'',
        shouldLogIn:false
    }
    componentDidMount=()=>
    {
        const uid= localStorage.getItem("uid")
        console.log(uid)
        if(uid!==null && uid!=="1")
        {
            fire.database().ref('users/'+uid+"/email").on('value',(snapshot)=>{
                const email=snapshot.val()
                this.setState({uid:uid,email:email,shouldLogIn:false})
            })
            fire.database().ref('users/'+uid+"/userName").on('value',(snapshot)=>{
                const name=snapshot.val()
                this.setState({name:name})
            })
        }
        else
        this.setState({shouldLogIn:true})        
    }

    onSubmit=()=>
    {
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
    }).catch((error) => {
     console.log(error)
  });

    }
    onSignout=()=>{
        Firebase.auth().signOut().then(() => {
            console.log("Log out")
            this.setState(
                {
                    uid:'',
                    name:'',
                    email:''
                })
                localStorage.setItem("uid",1)
                this.setState({shouldLogIn:true})
            
          }).catch((error) => {
            // An error happened.
          });
    }

    render()
    {
        let name=null
        if(this.state.name!=='' && this.state.name!==null)
        name=<div>
            <p>Welcome {this.state.name}</p>
            <p>Email: {this.state.email}</p>
            </div>


        let login=null
        if(this.state.shouldLogIn)
        login=<button onClick={this.onSubmit}>Login</button>

        let logout=null
        if(!this.state.shouldLogIn && this.state.email!==null && this.state.email!=='')
        logout=<button onClick={this.onSignout}>Signout</button>
        return (
            <div>
                {login}
                {logout}
                {name}
            </div>
        )
    }
}

export default Auth