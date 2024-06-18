import * as Types from './actionTypes';

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.POST_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.POST_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case Types.POST_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case Types.SET_ARTICLES:
       return {
        ...state,
        articles: action.payload.map(article => ({
          ...article,
          comments: article.comments || [], 
          commentCount: article.commentCount || 0, 
          loveCount: article.loveCount || 0, 
        })),
      };
      case Types.ADD_COMMENT:
       return {
        ...state,
        articles: state.articles.map(article => {
          if (article.id === action.payload.articleId) {
            return {
              ...article,
              comments: [...article.comments, action.payload.comment],
            };
          }
          return article;
        }),
      };
      case Types.UPDATE_COMMENT_COUNT:
       return {
        ...state,
        articles: state.articles.map(article => {
          if (article.id === action.payload.articleId) {
            return {
              ...article,
              commentCount: action.payload.count,
            };
          }
          return article;
        }),
      };
      case Types.UPDATE_LOVE_COUNT:
       return {
        ...state,
        articles: state.articles.map(article => {
          if (article.id === action.payload.articleId) {
            return {
              ...article,
              loveCount: action.payload.count,
            };
          }
          return article;
        }),
      };
      case Types.EDIT_ARTICLE:
      const { postId, updatedData } = action.payload;
      const updatedArticles = state.articles.map(article => {
        if (article.id === postId){
          return {
            ...article,
            ...updatedData
          };
        }
        return article;
      });
      return {
        ...state,
        articles: updatedArticles
      };
      case Types.DELETE_ARTICLE:
        return {
          ...state,
          articles: state.articles.filter(article => article.id !== action.payload),
        };
    default:
      return state;
  }
};

export default articleReducer;
