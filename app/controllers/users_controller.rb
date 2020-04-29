class UsersController < ApplicationController

  def index
  end

  def spotify
    @spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    # Now you can access user's private data, create playlists and much more

    User.create(
      auth_token: spotify_user.to_hash,
      username: spotify_user.id
    )

    session[:spotify_auth_token] = spotify_user.to_hash

    redirect_to root_path

    @tracks = spotify_user.top_tracks(time_range: 'medium_term')


    def index
    users = User.all.order(created_at: :desc)
      render json: user
    end

    def create
      user = User.create(
        auth_token: spotify_user.to_hash,
        username: spotify_user.id
      )
      if user
        render json: user
      else
        render json: user.errors
      end
    end

    # Track.create(
    #   spotify_track_id: tracks.id,
    #   track_name: tracks.name,
    #   track_url: tracks.href,
    #   artist_name: tracks.artists.name,
    # )


    # Access private data
    # spotify_user.country #=> "US"
    # spotify_user.email   #=> "example@email.com"

    # Create playlist in user's Spotify account
    # playlist = spotify_user.create_playlist!('my-awesome-playlist')

    # Add tracks to a playlist in user's Spotify account
    # tracks = RSpotify::Track.search('Know')
    # playlist.add_tracks!(tracks)
    # playlist.tracks.first.name #=> "Somebody That I Used To Know"

    # Access and modify user's music library
    # spotify_user.save_tracks!(tracks)
    # spotify_user.saved_tracks.size #=> 20
    # spotify_user.remove_tracks!(tracks)

    # albums = RSpotify::Album.search('launeddas')
    # spotify_user.save_albums!(albums)
    # spotify_user.saved_albums.size #=> 10
    # spotify_user.remove_albums!(albums)

    # Use Spotify Follow features
    # spotify_user.follow(playlist)
    # spotify_user.follows?(artists)
    # spotify_user.unfollow(users)

    # Get user's top played artists and tracks
    # spotify_user.top_artists #=> (Artist array)

    # Check doc for more
  end

end
