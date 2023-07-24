# xPress

Developer: Gustaaf Milzink

![Mockup image](docs/readme/amiresponsive.png)

[View live website](https://xpress-react-frontend-611bb46bac21.herokuapp.com/)

## Table of Contents

1.  [About](#about)
2.  [Project Goals](#project-goals)
3.  [User Experience](#user-experience)
    1.  [Target Audience](#target-audience)
    2.  [User Requirements and Expectations](#user-requirements-and-expectations)
    3.  [User Stories](#user-stories)
4.  [Technical Design](#technical-design)
    1.  [Agile Design](#agile-design)
    2.  [CRUD Functionality](#crud-functionality)
    3.  [Colours](#colours)
    4.  [Fonts](#fonts)
    5.  [Wireframes](#wireframes)
5.  [Technologies Used](#technologies-used)
    1.  [Coding Languages](#coding-languages)
    2.  [Frameworks and Tools](#frameworks-and-tools)
    3.  [Libraries](#libraries)
6.  [Front-End](#front-end)
    1.  [React](#react)
7.  [Back-End API](#back-end-api)
    1.  [Django REST Framework](#django-rest-framework)

## About

The xPress web app was developed to provide user's with a place to share their creativity online and react to content shared by others.

## Project Goals

The goal for this project was to build a platform where users can share and receive
feedback on their creative endevours. Users can create posts consisting of at least a title
and any or all of the following: Text(including excerpt), an image and an audiofile.

Key aspects:

*   Simple layout an intuitive navigation across all pages.
*   User authentication.
*   User interaction via likes, comments and followers.
*   User specific profiles containing: Bio, profile Avatar
*   CRUD functionality for posts, comments and profiles.
*   Filtering posts by keywords.
*   Responsive design ensuring a pleasant user experience across a range of devices.

## User Experience

### Target Audience

*   People looking for a place to share their own content.
*   People looking for a place to view other peoples content.
*   People looking to reveive/give feedback on their/others content.

### User Requirements and Expectations

*   A site which provides a level of interactivity between users.
*   Links and functions should act as expected.
*   Notifications to provide feedback on expected function outcomes
*   Responsiveness to allow pleasant use across devices of different screen sizes.

### User Stories

1.  Navigation: As a user I can view a navbar from every page, so that I can easily navigate the site.
2.  Navigation: Conditional Rendering, As a logged out user I can see sign-up/sign-in options so that I can sign in/up.
3.  Authentication: As a user I can create a new acccount so I can acces the features for signed up users.
4.  Authentication: As a user I can sign in to the app so I can acces features for signed in users.
5.  Log out of my accountAuthentication: As a user, I can log out of my account, so that I know my account is safe.
6.  Authentication: Status, As a user I can tell wether I am logged in or not so I can log in if I need to.
7.  Authentication: Refresh Acces Tokens, As a user I can maintain my logged in status so that my user experience is not compromised.
8.  Routing: As a user I can navigate through pages quickly so I can view content without refreshing the page,
9.  Avatar: As a user I can view a user's avatar so can easily identify different users.
    Adding/Liking Posts:
10. Create: As a user I can create posts so that I can share my content with others.
11. Create: As a user I can post Text, Images or Audio.
12. View: As a user I can view the details of a single post so I can learn more about it.
13. Like: As a user I can like a post so I can show support for content that interests me.
    Posts Listing
14. View recent posts: As a user I can view the most recent posts orderd by creation date so I can easily stay up to date with new content.
15. Search: As a user I can search for posts with keywords so I can find the posts that interest me.
16. View liked posts: As a logged in user I can view the posts I liked so I can easily find them again.
17. View posts by followed: As a logged in user I can view content filtered by users I follow so i can keep up to date with their content.
18. Infinite scroll: As a user I can keep scrolling through the posts on the site without having to click to go to the next page.
    Post Detail:
19. Post Page: As a user I can view a post page so I can read comments about the post.
20. Edit Post: As a post owner I can edit a posts content so I can update after the original posting.
21. Create Comment: As a logged in user I can add comments to a post so that I can share my thoughts on the content.
22. Comment Date: As a user I can see how long ago a comment was made so I know how old it is.
23. View Comments: As a user I can read comments on a post so I can find out what others user think about the content.
24. Delete comments: As a comments owner I can delete my comment so I can control if my comment remains available online.
25. Edit Comment: As a comments owner I can edit my comment so I can update existing comments
    Profile View:
26. Profile View: As a user I can view other users profiles so I can see their posts and learn more about them.
27. Most followed profiles: As a user I can see a list of the most followed profiles so that I can see wich profiles are most popular.
28. User Profile- user stats: As a user I can view statistics about  a specific user so i can learn more apout them.
29. Follow/Unfollow: As a logged in user I can follow/unfollow other users so i can see posts by specific users in my post feed.
30. View all posts by a specific user: As a user I can view all the posts by a specific user so that I can catch up on their latest posts, or decide I want to follow them
31. Edit profile: As a logged in user I can edit my profile so that I can change my profile picture and bio
32. Update username and password: As a logged in user I can update my username and password so that I can change my display name and keep my profile secure
33. See unpublished: As a logged in user I can easily see wether a post is published or not so that know what content i have (not yet) shared with others.
34. quick publish: As a logged in user I can easily publish a draft post so that easily manage my unpublished content.

##### Back to [table of contents](#table-of-contents)

## Technical Design

### Agile Design

An Agile approach to creating this app has been applied. GitHub's projects was used to track user stories and implement ideas based on their level of importance for allowing use of the app with no loss of functionality or user experience. Three categories were created indicating their level of importance, those were:

*   MUST HAVE
*   SHOULD HAVE
*   COULD HAVE

Github Issues and Milestones were used to define EPICS and keep track of seperate user stories contained therein giving an overview of the projects current state.

Project milestones can be found [here](https://github.com/G-Milzink/ci_pp5_xpress_react_frontend/milestones)

### CRUD Functionality

The xPress app handles data with full CRUD Functionality: <br>

*   Create -  Users can create, an account, profile, posts, comments, likes, and follow profiles.
*   Read - Users can view posts, comments, likes of other users and also the profiles of these users.
*   Update - Users can update their profile, password, posts, comments, likes and 'follows' through button and interactive forms.
*   Delete - Users can delete posts, comments, likes and 'follows' through interactive buttons.

### Colours

The colour scheme for this application was kept minimal  to not take atention away from use content.

<details>
<summary>Colours</summary>
<img src="docs/readme/colours.png">
</details>

### Fonts

A Google Font was implemented on the website. 'Shippori Antique B1' with a back up of sans-serif was chosen for use across the entire site.

### Wireframes

Balsamiq was used to create wireframes of the sites pages

<details>
<summary>Wireframes</summary>

</details>

##### Back to [table of contents](#table-of-contents)

## Technologies Used

### Coding Languages

*   HTML
*   CSS
*   Javascript
*   React

### Frameworks and Tools

*   [Axios](https://axios-http.com/docs/intro) - Axios is a Promise API. Justification: I used axios to send API requests from the React project to the API and avoid any CORS errors when sending cookies.

*   [JWT](https://jwt.io/) - Library to decode JSON Web token. Justification: I used JWT to securely transmit data and to have the ability to verify that the content has not been tampered with.

*   [React 17.0.2](https://17.reactjs.org/) - JavaScript library for building user interfaces. Justification: To be able to showcase my newly learnt skills and for building interactive user interfaces quickly.

*   [React-Bootstrap 1.6.7](https://react-bootstrap-v4.netlify.app/) - CSS framework. Justification: I used Bootstrap React library for UI components, styling and responsiveness.

*   [React Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component) - React library. Justification: I used this component to load content (tasks/comments/users) automatically as the user scrolls towards the bottom of the page without having to jump to next/previous page.

*   [React Router](https://v5.reactrouter.com/web/guides/quick-start) - Javascript framework for routing. Justification: I used this library to enable navigation between views of components and to have the ability to control what is presented to the user based on the URL they have accessed in the browser.

*   [Am I Responsive](http://ami.responsivedesign.is/) - Website responsive test site. Justification: I used this to create the multi-device mock-up at the top of this README.md file

*   [Balsamiq](https://balsamiq.com/) - Mock up software. Justification: I used this to create the projects wireframes

*   [Chrome dev tools](https://developers.google.com/web/tools/chrome-devtools/) - Developer tool. Justification: I used this for debugging of the code and checking site for responsiveness

*   [Cloudinary](https://cloudinary.com/) - File storage. Justification: I used this to store static files

*   [Font Awesome](https://fontawesome.com/) - Icon library. Justification: I used this to style the site with icons.

*   [Google Fonts](https://fonts.google.com/) - Font library. Justification: I used this to import fonts

*   [Gimp](https://www.gimp.org/) - Graphics editor. Justification: I used this to create custom graphic elements and edit images for documentation.

*   [Git](https://git-scm.com/) - Version control system. Justification: I used this for version control and to push the code to GitHub

*   [GitHub](https://github.com/) - Cloud based hosting service. Justification: I used this as a remote repository to store project code

*   [Gitpod](https://gitpod.io) - Cloud development environment. Justification: I used this to host a virtual workspace

*   Validation:

    *   [WC3 Validator](https://validator.w3.org/) - HTML Validator. Justification: I used this to validate the applications HTML code
    *   [Jigsaw W3 Validator](https://jigsaw.w3.org/css-validator/) - CSS Validator. Justification: I used this to validate the applications CSS code
    *   [ESLint](https://eslint.org/) - JavaScript Validator. Justification: I used this to validate applications JSX code
    *   [Lighthouse](https://developers.google.com/web/tools/lighthouse/) Site auditing tool. Justification: I used this to validate performance, accessibility, best practice and SEO of the application
    *   [Wave](https://wave.webaim.org/) - Site accesibility auditor. Justification: I used this to evaluate the applications accessibility

    ### Libraries

#### Installed Libraries

| Package       | Version        |
| ------------- | ------------- |
| axios |0.21.4 |
| bootstrap | 4.6.0 |
| jwt-decode | 3.1.2 |
| react-bootstrap | 1.6.3 |
| react-dom | 17.0.2 |
| react-infinite-scroll-component |6.1.0 |
| react-router-dom | 5.3.0 |
| react-scripts | 4.0.3 |
|remark|14.0.3 |
|web-vitals | 1.1.2 |

##### Back to [table of contents](#table-of-contents)
