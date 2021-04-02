import React, { Component} from 'react';

export default class ArtistResult extends Component {

    render(){
        console.log(this.props)

        return(<div className="ArtistResult">
            <h2 className="TitleSection">Artists</h2>
            <a className="SeeMoreArtistsAlbums" href="http://google.com">SEE ALL</a>

            <div className="InsideArtistResult">
                <div className="Row">
            {this.props.artists.map(artist =>(
                <div className="Column">
                    <div className="Inner">
                        {artist.images.length !== 0 ? 
                    (<img className="ArtistImage" src={`${artist.images[0].url}`} alt="new"/> ): (<img className="ArtistImage" src="https://i.pinimg.com/originals/7e/4f/89/7e4f892475aca7242883ceaf8aa89cc9.jpg"alt="new"/> )}
                     <div className="ArtistName">{artist.name}</div>
                     <div className="ArtistTag">Artist</div>
                    </div>
                     </div>
                    
                  ))}
                  </div>
            </div>
            

        </div>)
    }
}