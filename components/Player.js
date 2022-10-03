import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify'
import { useRecoilState} from 'recoil'
import {debounce} from 'lodash'
import useSongInfo from '../hooks/useSongInfo';
import {  ReplyIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';
import { FastForwardIcon,PauseIcon, PlayIcon, RewindIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid';

function Player() {
    const spotifyApi = useSpotify();
    const {data:session,status} = useSession();

    const [currentTrackId , setCurrentTrackId]=useRecoilState(currentTrackIdState)
    const [isPlaying ,setIsPlaying]=useRecoilState(isPlayingState);
    const[volume , setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body?.item.id);
               
                spotifyApi.getMyCurrentPlaybackState().then((data) => (
                      setIsPlaying(data.body?.is_playing)
                    ))
                
                })
        }
    }

    const handlePlayPause = () => {
       spotifyApi.getMyCurrentPlaybackState().then((data) => {
          if (data.body.is_playing) {
            spotifyApi.pause();
            setIsPlaying(false)
          }else {
            spotifyApi.play();
            setIsPlaying(true)
          }
       }) 
    }

    useEffect(()=>{
        if(spotifyApi.getAccessToken()&& !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    },[currentTrackId,spotifyApi,session])

    useEffect(()=>{
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    },[volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {})
        },500) , 
        []
    )

  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        <div className='flex items-center space-x-4'>
            <img src={songInfo?.album?.images?.[0]?.url} alt=''
            className='hidden md:inline h-10 w-10'/>
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>

        <div className='flex items-center justify-evenly'>
            <SwitchHorizontalIcon className='button' />
            <RewindIcon className='button' onClick={()=> spotifyApi.skipToPrevious()}/>
            
            {isPlaying ? (
                <PauseIcon onClick={handlePlayPause} className='button'/>
            ) :(
                <PlayIcon  onClick={handlePlayPause} className='button'/>
            )}

            <FastForwardIcon className='button' 
            onClick={()=>spotifyApi.skipToNext()}/>

            <ReplyIcon className='button'/>
        </div>

        <div className='flex items-center space-x-3 
        md:space-x-4 justify-end'>
            <VolumeOffIcon className='button'
             onClick={()=> volume>0 && setVolume(volume -10)}/>
            <input type='range' value={volume}
             min={0} max={100}
             onChange={e => setVolume(e.target.value)}/>
             <VolumeUpIcon className='button' 
             onClick={()=> volume<100 && setVolume(volume +10)}/>
        </div>
    </div>
  )
}

export default Player