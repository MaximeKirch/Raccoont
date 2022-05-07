import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBio } from '../../actions/user.actions'
import LeftNav from '../LeftNav'
import UploadImg from './UploadImg'
import { dateFormatter } from '../utils'
import FollowHandler from './FollowHandler'

export default function UpdateProfile() {
  const [bio, setBio] = useState('')
  const [updateForm, setUpdateForm] = useState(false)
  const userData = useSelector((state) => state.user)
  const usersData = useSelector((state) => state.users)
  const errors = useSelector((state) => state.errors.userErrors)
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(!updateForm)
  }

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="userPic" />
          <UploadImg />
          <p>{errors.maxSize}</p>
          <p>{errors.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modification</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateFormatter(userData.createdAt)}</h4>

          <h5 onClick={() => setFollowingPopup(!followingPopup)}>
            Abonnements : {userData.following ? userData.following.length : 0}
          </h5>
          <h5 onClick={() => setFollowersPopup(!followersPopup)}>
            Abonnés : {userData.followers ? userData.followers.length : 0}
          </h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span
              onClick={() => setFollowingPopup(!followingPopup)}
              className="cross"
            >
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler type={"suggestion"} idToFollow={user._id} />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span
              onClick={() => setFollowersPopup(!followersPopup)}
              className="cross"
            >
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler type={"suggestion"} idToFollow={user._id} />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
