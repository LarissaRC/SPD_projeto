import { reducerCases } from "./Constants";

export const initialState = {
    token:null,
    playlists: [],
    userId: null,
    userInfo: null,
    currentPlaying: null,
    playerState: false,
    selectedPlaylist: null,
    selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
    topTracks: [],
    topArtists: [],
    recentlyPlayed: [],
    selectedChatUser: null,
    recommendedTracks: [],
    recommendedArtists: [],
};

const reducer = (state,action) => {
    switch(action.type) {
        case reducerCases.SET_TOKEN: {
            return{
                ...state,
                token: action.token,
            };
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists: action.playlists,
            }
        }
        case reducerCases.SET_USER_ID: {
            return {
                ...state,
                userId: action.userId,
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case reducerCases.SET_PLAYING:
          return {
            ...state,
            currentPlaying: action.currentPlaying,
          };
        case reducerCases.SET_PLAYER_STATE:
          return {
            ...state,
            playerState: action.playerState,
          };
        case reducerCases.SET_PLAYLIST:
          return {
            ...state,
            selectedPlaylist: action.selectedPlaylist,
          };
        case reducerCases.SET_PLAYLIST_ID:
          return {
            ...state,
            selectedPlaylistId: action.selectedPlaylistId,
          };
          case reducerCases.SET_TOP_TRACKS:
          return {
            ...state,
            topTracks: action.topTracks,
          };
          case reducerCases.SET_TOP_ARTISTS:
          return {
            ...state,
            topArtists: action.topArtists,
          };
          case reducerCases.SET_RECENTLY_PLAYED:
          return {
            ...state,
            recentlyPlayed: action.recentlyPlayed,
          };
          case reducerCases.SET_SELECTED_CHAT:
          return {
            ...state,
            selectedChatUser: action.selectedChatUser,
          }
          case reducerCases.SET_RECOMMENDED_TRACKS:
          return {
            ...state,
            recommendedTracks: action.recommendedTracks,
          }
          case reducerCases.SET_RECOMMENDED_ARTISTS:
          return {
            ...state,
            recommendedArtists: action.recommendedArtists,
          }
        default:
            return state;
    }
};

export default reducer;