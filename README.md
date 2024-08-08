Front-End Project: NC News

For the NC News project, I developed a comprehensive front-end application using React to interface with the NC News API. This project aims to provide users with an intuitive and interactive interface for browsing and managing news articles.

Key Features and Components:

Article Display: Users can view detailed articles, including titles, authors, images, and full content. Each article's vote and comment counts are dynamically updated.
Voting System: Enables users to upvote or downvote articles, with real-time updates and optimistic rendering for a responsive user experience.
Comment Section: Users can read and post comments on articles. The comment section features a form for new comments and displays existing comments with author and date information.
Components:

Header: Provides navigation links and branding for the application. Includes links to different sections such as Home, Articles, and Add Article.
Home: The landing page that displays an overview of the latest articles and offers navigation to view more details or add new articles.
Article: A detailed view of a single article, including the ability to vote and view or post comments. Utilizes the SingleArticle component to present article details.
ArticleCard: A card component that presents a summary of an article, including its title, author, and a brief excerpt. Used in lists to provide an overview of articles.
AddArticle: A form component allowing users to submit new articles. Includes fields for article title, content, and other relevant details.
Footer: Displays additional information or links at the bottom of the page, such as contact details or legal information.
CommentCard: Displays individual comments with details like the author and creation date.
ErrorBoundary: Catches and displays error messages when API calls or component rendering fails.
LoadingSpinner: Provides visual feedback while data is being loaded.
Technologies Used:

React: For building the user interface and managing component state.
React Router: For handling client-side routing and enabling navigation between different views and components.
Axios: For making HTTP requests to the NC News API and managing API interactions.
CSS: For styling the application, ensuring a responsive and visually appealing design.
Implementation Highlights:

State Management: Utilises React's useState and useEffect hooks to manage component state and handle side effects.
Optimistic UI Updates: Ensures a responsive user experience by updating the vote count optimistically before confirming the API response.
Form Handling: Implements controlled components for managing form submissions, including article creation and comment posting.
This front-end project provides a user-friendly and engaging interface for interacting with the NC News API, leveraging modern React features and best practices to deliver a robust and intuitive news aggregation platform.
