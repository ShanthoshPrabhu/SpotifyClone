import React from 'react'
import { playlistState } from '../atoms/playlistAtom'
import {useRecoilValue} from 'recoil'
import Song from './Song'

function Songs() {

    const playlist = useRecoilValue(playlistState)

  return (
    <div className='text-white'>
        {playlist?.tracks.items.map((track , i) => (
            <Song key={track.track.id} track={track} order={i}/>
        ))}
    </div>
  )
}

export default Songs