import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleToName = (event) => {
    setName(event.target.value)
  }

  const handleToEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleToPassword = (event) => {
    setPassword(event.target.value)
  }

  const handleToCheck = (event) => {
    setRegistered(event.target.checked)
    // console.log(event.target.checked);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('form submit');

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain at lest one special character')
      return;
    }

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setSuccess('Successfully Log In')
          setError('');
          console.log(user);
        })
        .catch(error => {
          setError(error.message)
          console.error(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setSuccess('Successfully Create User')
          setError('');
          verifyEmail();
          updateUserProfile();
        })
        .catch(error => {
          setError(error.message)
          console.error(error.message);
        })
    }
  }


  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setSuccess('Please Verify Your Email Account');
        console.log('Verify email sent');
      })
  }

  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {

      })
  }

  const ForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess('Password Reset Email Sent');
        setError('');
        console.log('Password reset email sent');
      })
      .catch(error => {
        setError(error.message)
      })
  }

  return (
    <div>
      <div className="w-50 mx-auto mt-5">
        <Form onSubmit={handleSubmit}>
          <h1 className='text-primary'>Please {registered ? 'Login' : 'Registered'}!!</h1>

          {!registered && <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control required onBlur={handleToName} type="text" placeholder="Enter Name" />
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required onBlur={handleToEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required onBlur={handleToPassword} type="password" placeholder="Password" />
          </Form.Group>

          <p className='text-success mb-0'>{success}</p>
          <p className='text-danger mb-0'>{error}</p>

          {registered && <Button onClick={ForgetPassword} variant="link">Forget Password
          </Button>}

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check onChange={handleToCheck} type="checkbox" label="Already Registered" />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Registered'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
