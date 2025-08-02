const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  return (
    <div>
      <audio>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default AudioPlayer
