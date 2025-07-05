'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Download } from 'lucide-react'
import WebMonetizationStatus from './components/WebMonetizationStatus'

interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  src: string
  cover: string
}

// Sample tracks - replace with your actual music
const tracks: Track[] = [
  {
    id: 1,
    title: "Sample Track 1",
    artist: "Your Artist Name",
    album: "Demo Album",
    duration: "3:45",
    src: "/music/track1.mp3",
    cover: "/images/album1.jpg"
  },
  {
    id: 2,
    title: "Sample Track 2", 
    artist: "Your Artist Name",
    album: "Demo Album",
    duration: "4:12",
    src: "/music/track2.mp3",
    cover: "/images/album2.jpg"
  },
  {
    id: 3,
    title: "Sample Track 3",
    artist: "Your Artist Name", 
    album: "Demo Album",
    duration: "3:28",
    src: "/music/track3.mp3",
    cover: "/images/album3.jpg"
  }
]

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audioElement = new Audio(currentTrack.src)
    setAudio(audioElement)

    const updateTime = () => setCurrentTime(audioElement.currentTime)
    const updateDuration = () => setDuration(audioElement.duration)

    audioElement.addEventListener('timeupdate', updateTime)
    audioElement.addEventListener('loadedmetadata', updateDuration)
    audioElement.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audioElement.removeEventListener('timeupdate', updateTime)
      audioElement.removeEventListener('loadedmetadata', updateDuration)
      audioElement.removeEventListener('ended', () => setIsPlaying(false))
      audioElement.pause()
    }
  }, [currentTrack])

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playNext = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
    setIsPlaying(false)
  }

  const playPrevious = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1
    setCurrentTrack(tracks[prevIndex])
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Music Demo Tracks</h1>
        <WebMonetizationStatus />
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 text-white">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold">🎵</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{currentTrack.title}</h2>
                  <p className="text-gray-300 mb-1">{currentTrack.artist}</p>
                  <p className="text-gray-400 text-sm">{currentTrack.album}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <button 
                  onClick={playPrevious}
                  className="p-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipBack size={24} />
                </button>
                <button 
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button 
                  onClick={playNext}
                  className="p-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipForward size={24} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Heart size={18} />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Share2 size={18} />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Download size={18} />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Playlist</h3>
              <div className="space-y-7">
                {tracks.map((track) => (
                  <div 
                    key={track.id}
                    onClick={() => setCurrentTrack(track)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      currentTrack.id === track.id 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">
                        {track.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{track.title}</h4>
                        <p className="text-gray-400 text-xs">{track.artist}</p>
                      </div>
                      <span className="text-gray-400 text-xs">{track.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        

          </div>
        </div>  )
}