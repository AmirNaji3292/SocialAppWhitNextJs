import React, { Suspense } from 'react'
import FriendsRequest from './FriendsRequest'
import Birthdays from './Birthdays'
import Ad from './Ad'
import { User } from '@prisma/client'
import UserInfoCard from './UserInfoCard'
import UserMediaCard from './UserMediaCard'
import UserList from './AllUserList/UserList'

function RightMenue({user}:{user?:User}) {
  return (
    <div className='flex flex-col gap-4'>
      {
        user?(<>
        <Suspense fallback='loading...'>
          <UserInfoCard user={user}/>
          </Suspense>
           <Suspense fallback='loading...'>
          <UserMediaCard user={user}/> 
          </Suspense>
        </>):null}
      <UserList/>
      <FriendsRequest/>
      <Birthdays/>
      <Ad size='md'/>
    </div>
  )
}

export default RightMenue