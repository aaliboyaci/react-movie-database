const genreTitleReducer = (state = "", action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_GENRE_NAME':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default genreTitleReducer;