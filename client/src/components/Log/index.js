import React, {useState} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default function Log(props) {

    const [signUpModal, setSignUpModal] = useState(props.signUp)
    const [signInModal, setSignInModal] = useState(props.signIn)

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(true)
            setSignUpModal(false)
        } else if (e.target.id === "login") {
            setSignUpModal(true)
            setSignInModal(false)
        }
    }
  return(
    <div className='connection-form'>
        <div className="form-container">
            <ul>
                <li id="login" onClick={handleModals} className={signUpModal ? "active-btn" : null}>S'inscrire</li>
                <li id="register" onClick={handleModals} className={signInModal ? "active-btn" : null}>Se connecter</li>
            </ul>
            {signUpModal && <SignUpForm/>}
            {signInModal && <SignInForm/>}
        </div>
    </div>
  )
}
