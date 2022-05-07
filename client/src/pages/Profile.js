import React, {useContext} from 'react'
import Log from '../components/Log'
import { UidContext } from '../components/AppContext'
import UpdateProfile from '../components/Profile/UpdateProfile'

export default function Profile() {

    const uid= useContext(UidContext)
  return (
    <div className="profil-page">
        {uid ? ( <UpdateProfile/>) : ( 
        <div className="log-container">
            <Log signIn={true} signUp={false} />
            <div className='img-container'>
                <img src='./img/log.svg' alt="img-log"/>
            </div>
        </div>
        )}
    </div>
  )
}
