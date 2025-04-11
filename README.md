# URL Shortening App – Frontend

A full-stack web application that allows users to shorten long URLs and manage them in a personalized dashboard. Users can create, view, update, and delete shortened URLs, as well as leave comments on individual links.

🔗 **Check out the Application [Here](https://)**

---

## Tech Stack

- **Frontend**: React
- **Backend**: MongoDB, Express
- **Deployment**:
  - Frontend: [Heroku Pages](https://www.heroku.com/)
  - Backend: [Netlify](https://www.netlify.com/)

---

## Key Features

- Shorten long URLs into cleaner, shareable links
- View a list of your shortened URLs
- Edit or delete existing shortened URLs
- Add notes to each URL
- Tracking features
- Copy and open URL

---

## RESTful Routes

| HTTP Method | Controller       | Response | URI                          | Use Case              |
|-------------|------------------|----------|------------------------------|-----------------------|
| **POST**    | create           | 200      | /urls                        | Create a URL          |
| **GET**     | index            | 200      | /urls                        | List all URLs         |
| **GET**     | show             | 200      | /urls/:urlId                | Get a single URL      |
| **PUT**     | update           | 200      | /urls/:urlId                | Update a URL          |
| **DELETE**  | deleteUrl        | 200      | /urls/:urlId                | Delete a URL          |
| **POST**    | createComment    | 200      | /urls/:urlId/comments       | Create a comment      |

---

## Project Links

| Resource            | Link |
|---------------------|------|
| **Trello Board**     | [View Trello Board](https://trello.com/b/m0Z0nQ76/project-3-crud) |
| **Deployed App**     | [View Deployed App](https://) |
| **Frontend Repo**    | [GitHub Frontend Repository](https://github.com/kiran1926/URL-shortening-app-frontend) |
| **Backend Repo**     | [GitHub Backend Repository](https://github.com/kiran1926/URL-shortening-app-backend) |

---

## Clone This Repo

To clone and navigate into the backend:

```bash
git clone https://github.com/kiran1926/URL-shortening-app-backend && cd URL-shortening-app-backend
```

```bash
git clone https://github.com/kiran1926/URL-shortening-app-frontend && cd URL-shortening-app-frontend
```

## Next Steps

- Add analytics

## Frameworks & Libraries

- **React** – Frontend framework
- **MongoDB** – Database
- **Express** – Backend framework
- **Tailwind CSS** – For styling

## Contributors

- **Rosa Perez** – [GitHub](https://github.com/paintedlbird7)
- **Kiran Roge** – [GitHub](https://github.com/kiran1926)
- **Ashley Corbett** – [GitHub](https://github.com/AMC292-design)
- **Rae McElroy** – [GitHub](https://github.com/rmcelroy1990)
