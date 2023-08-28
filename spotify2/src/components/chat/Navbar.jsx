import React from 'react'

function Navbar({ currentUser }) {

  return (
    <div className='navbar'>
      <span className="logo">Chat</span>
      <div className="user">
        <img src={currentUser?.userProfileImage} alt="" />
        <span>{currentUser?.userName}</span>
        {/*<button onClick={()=>signOut(auth)}>logout</button>*/}
      </div>
    </div>
  )
}

export default Navbar;