import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addPost, getPosts } from '../../actions/post.actions'
import { isEmpty, timestampParser } from '../utils'

export default function NewPostForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [postPicture, setPostPicture] = useState(null)
  const [postVideo, setPostVideo] = useState('')
  const [file, setFile] = useState()
  const userData = useSelector((state) => state.user)
  const errors = useSelector((state) => state.errors.postErrors)
  const dispatch= useDispatch()

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)
    handleVideo()
  }, [userData, message, postVideo ])

  const handlePicture = (e) => {
      setPostPicture(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0])
      setPostVideo('')
  }

  const handlePost = async () => {
      if(message || postPicture || postVideo) {
          const data = new FormData()
          data.append('posterId', userData._id)
          data.append('message', message)
          if(file) data.append('file', file)
          data.append('video', postVideo)

          await dispatch(addPost(data))
          dispatch(getPosts())
          cancelPost()
      } else {
          alert('Veuillez entrer un message')
      }
  }

  const handleVideo = () => {
    let findLink = message.split(' ')
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes('https://www.yout') ||
        findLink[i].includes('https://yout') ||
        findLink[i].includes('https://www.dailymo')
      ) {
        let embed = findLink[i].replace('watch?v=', 'embed/')
        setPostVideo(embed.split('&')[0])
        findLink.splice(i, 1);
        setMessage(findLink.join(" "))
        setPostPicture('');
      }
    }
  }

  const cancelPost = () => {
    setMessage('')
    setPostPicture('')
    setPostVideo('')
    setFile('')
  }

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{' '}
              Abonnement
              {userData.following && userData.following.length > 1 ? 's' : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{' '}
              Abonné
              {userData.followers && userData.followers.length > 1 ? 's' : null}
            </p>
          </div>
          <NavLink to="/profile">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || postVideo.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className='pseudo"'>
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {postVideo && (
                      <iframe
                        src={postVideo}
                        frameBorder="0"
                        allow="accelerometer; autoplay: clipboard-write; encrypted-media: gyroscope; picture-in-picture"
                        allowFullScreen
                        title={postVideo}
                      />
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(postVideo) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".pgn, .jpg, .jpeg"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {postVideo && (
                  <button onClick={() => setPostVideo('')}>
                    Supprimer video
                  </button>
                )}
              </div>
              {isEmpty(errors.format) && <p>{errors.format}</p>}
              {isEmpty(errors.size) && <p>{errors.size}</p>}
              <div className="btn-send">
                {message || postPicture || postVideo.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
