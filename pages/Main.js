import React from 'react'
import Centre from '../components/Centre'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'
import { getSession } from 'next-auth/react'

function Main() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar/>
        <Centre/>
      </main>
      <div className='sticky bottom-0'>
        <Player/>
      </div>
    </div>
  )
}

export default Main


export async function getServerSideProps(context){
    const session = await getSession(context);
  
    return {
      props: {
        session
      }
    }
  }