import {createSignal} from 'solid-js';
import './styles/styles.css';
import './styles/loginReg.css';
import { A } from '@solidjs/router';

function Signup() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  
  const handleSignup = async function(e: Event){
    e.preventDefault();
    
    await fetch("http://localhost:8080/deleteall", {
      method: "DELETE"
    });

    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email(), password: password() }),
    });
  
    if (response.status === 201) {
      window.location.href = "/dashboard";
    } else if (response.status === 409) {
      alert("User exists");
    } else {
      alert("Server Error");
    }
  };

  return (
    <>
      <form class="login-container" onSubmit={handleSignup}>
        <h1>SecureBase</h1>
        <h3 class="field-description">Email</h3>
        <input type="text" placeholder="example@email.com" value={email()} onInput={(e) => setEmail(e.target.value)}/>
        <h3 class="field-description">Password</h3>
        <input type="password" placeholder="password" value={password()} onInput={(e) => setPassword(e.target.value)}/>
        <section class="button-container">
          <button type="submit" id="login-button">Signup</button>
          <A href="/">Login</A>
        </section>
      </form>
    </>
  );
}

export default Signup;