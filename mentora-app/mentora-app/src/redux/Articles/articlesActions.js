import * as Types from './actionTypes';
import axios from 'axios';

export const setArticles = (articles) => ({
  type: Types.SET_ARTICLES,
  payload: articles,
});

export const addComment = (articleId, comment) => ({
  type: Types.ADD_COMMENT,
  payload: { articleId, comment },
});

export const updateCommentCount = (articleId, count) => ({
  type: Types.UPDATE_COMMENT_COUNT,
  payload: { articleId, count },
});

export const updateLoveCount = (articleId, count) => ({
  type: Types.UPDATE_LOVE_COUNT,
  payload: { articleId, count },
});

export const editArticle = (articleId, updatedArticleData) => ({
  type: Types.EDIT_ARTICLE,
  payload: { articleId, updatedArticleData },
});

export const deleteArticle = (articleId) => ({
  type: Types.DELETE_ARTICLE,
  payload: articleId,
});

export const postArticleRequest = () => ({
  type: Types.POST_ARTICLE_REQUEST,
});

export const postArticleSuccess = () => ({
  type: Types.POST_ARTICLE_SUCCESS,
});

export const postArticleFailure = (error) => ({
  type: Types.POST_ARTICLE_FAILURE,
  payload: error,
});


export const postArticleToAPI = (articleData) => {
  return async (dispatch) => {
    dispatch(postArticleRequest());
    try {
      const response = await axios.post('http://localhost:4000/api/post/post', articleData);
      dispatch(postArticleSuccess(response.data));
    } catch (error) {
      dispatch(postArticleFailure(error.message));
    }
  };
};
