import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-project-nc-news-owan.onrender.com",
});

export const getArticles = () => {
  return api
    .get(`/api/articles`)
    .then(({ data }) => {
      return data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

export const getCommentsByArticleId = (articleId) => {
  return api
    .get(`/api/articles/${articleId}/comments`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error("Failed to fetch comments:", error);
      throw error;
    });
};

export const getUsers = () => {
  return api
    .get(`/api/users`)
    .then(({ data }) => {
      return data.users;
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
};

export const getArticlesById = (article_id) => {
  return api
    .get(`/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((error) => {
      console.error(`Error fetching article with ID ${article_id}:`, error);
      throw error;
    });
};

export const getTopics = () => {
  return api
    .get(`/api/topics`)
    .then(({ data }) => {
      return data.topics;
    })
    .catch((error) => {
      console.error("Error fetching topics:", error);
      throw error;
    });
};

export const postComment = (article_id, username, body) => {
  return api
    .post(`/articles/${article_id}/comments`, { username, body })
    .then(({ data }) => data.comment)
    .catch((error) => {
      console.error("Failed to post comment:", error);
      throw error;
    });
};

export const voteOnArticle = (article_id, inc_votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes }) // Send PATCH request with article ID and increment/decrement votes
    .then(({ data }) => {
      // Ensure the response structure matches your expectations
      return data.article.votes; // Extract the updated vote count
    })
    .catch((error) => {
      console.error(
        `Failed to update votes for article ID ${article_id}:`,
        error
      );
      throw error; // Re-throw the error to be caught by the caller
    });
};
