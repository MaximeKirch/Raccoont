import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../components/AppContext'
import LeftNav from '../components/LeftNav'
import { isEmpty } from '../components/utils'
import Card from '../components/Post/Card'
import Trends from '../components/Trends'
import FriendsHint from '../components/Profile/FriendsHint'

export default function Trending() {
  const uid = useContext(UidContext)
  const trendList = useSelector(state => state.trending)
  return (
    <div className='trending-page'>
      <LeftNav/>
      <div className='main'>
        {!isEmpty(trendList[0]) && trendList.map((post) => <Card post={post} key={post._id}/>)}
      </div>
      <div className='right-side'>
        <Trends />
        {uid && <FriendsHint/>}
      </div>
    </div>
  )
}
