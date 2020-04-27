import React from 'react';
class Register extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      Email:'',
      Password:'',
      Name:''
    }
  }
  onEmailChange=(event)=>{
    this.setState({Email:event.target.value})
  }
  onPasswordChange=(event)=>{
    this.setState({Password:event.target.value})
  }
  onNameChange=(event)=>{
    this.setState({Name:event.target.value})
  }
  onSubmitSignIn =()=>{
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:this.state.Email,
        password:this.state.Password,
        Name:this.state.Name,
      })
    })
    .then(response => response.json())
    .then(user =>{
      if(user){
        this.props.loaduser(user)
        this.props.onroutechange('home');
      }
    })
  }
 render(){
  return(
<article Class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
  <main Class="pa4 black-80">
   <form Classname="measure center">
    <fieldset id="sign_up" Class="ba b--transparent ph0 mh0">
      <legend Class="f4 fw6 ph0 mh0">Register</legend>
       <div Class="mt3">
        <label Class="db fw6 lh-copy f6" for="email-address">Name</label>
        <input onChange={this.onNameChange} Class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
      </div>
      <div Class="mt3">
        <label Class="db fw6 lh-copy f6" for="email-address">Email</label>
        <input onChange={this.onEmailChange} Class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div Class="mv3">
        <label Class="db fw6 lh-copy f6" for="password">Password</label>
        <input onChange={this.onPasswordChange} Class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div Class="">
      <input
       onClick={this.onSubmitSignIn}
       Class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
    </div>
   </form>
  </main>
 </article>
  );
  }
}
export default Register;