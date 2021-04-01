import React from 'react'
import Firebase from 'firebase'
import fire from '../Firebase';
class Auth extends React.Component
{
    state={
        uid:'',
        name:'',
        email:''
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
      fire.database().ref('users/'+user.uid).update(
          {
              userName:user.displayName,
              email:user.email
          }
      )
      localStorage.setItem('uid',user.uid)
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
            
          }).catch((error) => {
            // An error happened.
          });
    }
    getuid=()=>{
        return(this.state.uid)
    }

    render()
    {
        let name=null
        if(this.state.uid!=='')
        name=<div>
            <p>Welcome {this.state.name}</p>
            <p>Email: {this.state.email}</p>
            </div>
        return (
            <div>
                <button onClick={this.onSubmit}>Login</button>
                <button onClick={this.onSignout}>Signour</button>
                {name}
            </div>
        )
    }
}

export default Auth