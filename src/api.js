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
