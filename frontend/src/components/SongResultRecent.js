import React, { Component} from 'react';
import Song from './Song'
import { connect } from 'react-redux'
import {startPlayback, pauseTrack, eraseTrackerSong, resumePlayback, changeFromTracker} from '../actions/musicPlayerActions'

class SongResultRecent extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.songs !== prevProps.songs){
      this.setState(state => ({ songs: this.props.songs }))
    }
    if(prevProps.state.changeFromTracker !== this.props.state.changeFromTracker){
      this.props.songs.forEach(function (songplaylist) {
        songplaylist.track.open = false;
      })}
  }

    state = {
        selectedElement: "empty",
        songs: this.props.songs,
        currentSong: "empty"
       }
    renderSongs = () => this.props.songs.map((songplaylist, index) => <Song key={index} index={index} song ={songplaylist.track} songplaylist ={songplaylist}  user={this.props.state.user} callPlayback={this.callPlayback} />) 

    callPlayback = (event) => {
      let savedInfo = event
      console.log(savedInfo.target.id)
      console.log(this.state.currentSong)
      console.log(savedInfo.target.id !== this.state.currentSong)
        if (savedInfo.target.id !== this.state.currentSong){
          this.callPlaybackOnNewSong(savedInfo)
          console.log("new song")
        }
        else if (savedInfo.target.id === this.state.currentSong){
         this.callPlaybackOnSameSong(savedInfo)
        }
   }

   callPlaybackOnNewSong = (savedInfo) => {
    if(!this.props.state.playbackOn){
      let selectedElement = this.props.songs.splice(savedInfo.target.id, 1)[0]

       this.props.startPlayback(savedInfo.target.name, this.props.state.deviceID, this.props.state.token)
         this.props.songs.forEach(function (songplaylist) {
           songplaylist.track.open = false;
         })
       selectedElement.track.open = true;
      this.props.songs.splice(savedInfo.target.id, 0, selectedElement)   
      this.setState({songs: this.props.songs, selectedElement: selectedElement})
       }

       else if (this.props.state.playbackOn){
        let selectedElement = this.props.songs.splice(savedInfo.target.id, 1)[0]

        this.props.startPlayback(savedInfo.target.name, this.props.state.deviceID, this.props.state.token)
          this.props.songs.forEach(function (songplaylist) {
            songplaylist.track.open = false;
          })
        selectedElement.track.open = true;
       this.props.songs.splice(savedInfo.target.id, 0, selectedElement)   
       this.setState({songs: this.props.songs, selectedElement: selectedElement})

       }
       else if(!this.props.state.playbackPaused){
          this.props.pauseTrack(this.props.state.deviceID, this.props.state.token)
         this.props.songs.forEach(function (songplaylist) {
          songplaylist.track.open = false;
        })
    }
    this.setState({songs: this.props.songs, currentSong: savedInfo.target.id})  
  }

   callPlaybackOnSameSong = (savedInfo) => {
    if(!this.props.state.playbackOn && this.props.state.playbackPaused){
      console.log("Resume Playback")
      let selectedElement = this.props.songs.splice(savedInfo.target.id, 1)[0]

       this.props.resumePlayback(this.props.state.deviceID, this.props.state.token)
         this.props.songs.forEach(function (songplaylist) {
           songplaylist.track.open = false;
         })
       selectedElement.track.open = true;
      this.props.songs.splice(savedInfo.target.id, 0, selectedElement)   
      this.setState({songs: this.props.songs, selectedElement: selectedElement})
       }
       else if (!this.props.state.playbackPaused){
        this.props.pauseTrack(this.props.state.deviceID, this.props.state.token)
        this.props.songs.forEach(function (songplaylist) {
         songplaylist.track.open = false;
       })
      this.setState({songs: this.props.songs})    
       }

   }



    render(){

        return(<div className="SongResultRecent">

             <h4 className="TitleSection">{"Recently Played Songs"}</h4>

            <div className="InsideSongResultRecent">
                {this.renderSongs()}
            </div>
        </div>)
    }
}


const mapStateToProps = state => {
    return {
      state
    }
  }

const mapDispatchToProps = dispatch => ({
  startPlayback: (spotifyuri, deviceID, token) => dispatch(startPlayback(spotifyuri, deviceID, token)),
   resumePlayback: (deviceID, token) => dispatch(resumePlayback(deviceID, token)),
   pauseTrack: (deviceID, token) => dispatch(pauseTrack(deviceID, token)),
   eraseTrackerSong: () => dispatch(eraseTrackerSong()),
   changeFromTracker: (changeFromTrackerState) => dispatch(changeFromTracker(changeFromTrackerState))

    
})

export default connect(mapStateToProps, mapDispatchToProps)(SongResultRecent) 