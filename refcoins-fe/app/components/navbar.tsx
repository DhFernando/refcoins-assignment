import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
       
    </div>
    <a className="btn btn-ghost text-xl">Real Estate</a>
  </div>
   
  <div className="navbar-end"> 
  <Link href="/">Home</Link>
  <button className="btn btn-sm bg-blue-600 border-none text-white mx-5">Add Property</button>
  </div>
</div>
  )
}

export default NavBar