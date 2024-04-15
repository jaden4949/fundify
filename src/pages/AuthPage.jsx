import { useState } from 'react';
import SignUpForum from '../components/SignUpForum';
import LoginForm from '../components/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main>
      <h1>AuthPage</h1>
      <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
      { showSignUp ?
          <SignUpForum setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
    </main>
  );
}