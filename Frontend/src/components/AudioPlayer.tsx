import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";

function AudioPlayer() {

  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { isPlaying, currentSong } = usePlayerStore();


  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        console.log("playing from audioplayer");
        
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  },[isPlaying])

  const handleEnd = () => {
    usePlayerStore.getState().playNext();
  }

  // handle song change

  useEffect(() => {
		if (!audioRef.current || !currentSong) return;

		const audio = audioRef.current;

		// check if this is actually a new song
		const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
		if (isSongChange) {
      console.log("change audioUrl to:", currentSong?.audioUrl);
      
			audio.src = currentSong?.audioUrl;
			// reset the playback position
			audio.currentTime = 0;

			prevSongRef.current = currentSong?.audioUrl;

			if (isPlaying) audio.play();
		}
	}, [currentSong, isPlaying]);



  return (
    <div>
      <audio ref={audioRef} onEnded={handleEnd} />
    </div>
    
  )
  ;
}

export default AudioPlayer;
