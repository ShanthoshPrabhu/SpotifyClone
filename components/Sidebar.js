import React, { useEffect, useState } from 'react'
import {HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon, HeartIcon, RssIcon} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import {useRecoilState} from 'recoil'
import useSpotify from '../hooks/useSpotify';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';



function Sidebar() {
   const {data:session,status} = useSession();
   const spotifyApi = useSpotify();

   const [playlist,setPlaylist] = useState([]);
   const[playlistId,setplaylistId]=useRecoilState(playlistIdState)
   
  

   useEffect(()=>{
     if (spotifyApi.getAccessToken()){
          spotifyApi.getUserPlaylists().then((data) => {
         setPlaylist(data.body.items)
      })
   }
   },[session,useSpotify])

    console.log(playlist)

    function logOut () {
      
      window.location.replace('/login')
      signOut();
    }

  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r
     border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem]
     lg:max-w-[15rem]'>
        <div className='space-y-4'>
           <button className='flex items-center space-x-2 hover:text-white' 
           onClick={logOut}>
               <p>Log out</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white' >
               <HomeIcon className='w-5 h-5'/>
               <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
               <SearchIcon className='w-5 h-5'/>
               <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
               <LibraryIcon className='w-5 h-5'/>
               <p>Your library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900 ' />
        </div>
        <div className='space-y-4 pt-4'>
            <button className='flex items-center space-x-2 hover:text-white ' >
               <PlusCircleIcon className='w-5 h-5 space-y-4'/>
               <p>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
               <HeartIcon className=' w-5 h-5'/>
               <p>Liked Songs</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
               <RssIcon className='w-5 h-5'/>
               <p>Your episodes</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>

           {playlist.map((list)=>(
             <p key={list.id} className='cursor-pointer hover:text-white'
             onClick={()=>setplaylistId(list.id)}>
               {list.name}
             </p>
           ))}
           

        </div>
    </div>
  )
}

export default Sidebar