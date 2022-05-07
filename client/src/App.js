import React, { useEffect, useState } from 'react'
import { UidContext } from './components/AppContext'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Home from './pages/Home'
import { getUser } from './actions/user.actions'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Trending from './pages/Trending'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user)
  const userValue = useSelector((state) => state.user.value)

  console.log(userId)
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res)
          setUid(res.data)
        })
        .catch((err) => console.log(err))
    }
    fetchToken()

    if (uid) dispatch(getUser(uid))
  }, [uid])

  return (
    <>
      <UidContext.Provider value={uid}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trending" element={<Trending />} />
          </Routes>
        </Router>
      </UidContext.Provider>
    </>
  )
}

export default App
