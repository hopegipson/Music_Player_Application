import React, { Component} from 'react';

export default class ArtistResultHome extends Component {

    render(){

        return(<div className="ArtistResultHome">
            <h2 className="TitleSectionHome">Suggested Artists</h2>
            <a className="SeeMoreArtistsAlbums" href="http://google.com">SEE ALL</a>

            <div className="InsideArtistResultHome">
                <div className="Row">
            {this.props.artists.slice(0,6).map(artist =>(
                <div className="Column" key={artist.id}>
                    <div className="Inner">
                        {artist.images.length !== 0 ? 
                    (<img className="ArtistImage" src={`${artist.images[0].url}`} alt="new"/> ): (<img className="ArtistImage" src="https://i.pinimg.com/originals/7e/4f/89/7e4f892475aca7242883ceaf8aa89cc9.jpg"alt="new"/> )}
                     <div className="ArtistName">{artist.name}</div>
                     <div className="ArtistTag">ARTIST</div>
                    </div>
                     </div>
                    
                  ))}

            
                  </div>
                  <div className="Row2">
                  {this.props.artists.slice(7,13).map(artist =>(
                <div className="Column" key={artist.id}>
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