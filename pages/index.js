import Sidebar from '../components/Sidebar'
import Centre from '../components/Centre'
import { getSession } from 'next-auth/react'
import Player from '../components/Player';
import Login from './login';
import { getProviders, signIn } from "next-auth/react";

export default function Home({providers}) {
  return (
    <div className='flex flex-col items-center bg-black first-letter 
    min-h-screen w-full justify-center'>
       <img className='w-52' src='https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png' alt=''/>
       
       {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className='bg-[#18D860] text-white p-2 mt-8 rounded-lg'
           onClick={() =>signIn(provider.id , {callbackUrl:'/Main'})}>
            Login with {provider.name}
          </button>
        </div>
       ))}
    </div>
  )
}


export async function getServerSideProps (){
  const providers = await getProviders();
  return {
    props:{
      providers
    }
  }
}

// export async function getServerSideProps(context){
//   const session = await getSession(context);

//   return {
//     props: {
//       session
//     }
//   }
// }
