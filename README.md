```
Expense-Sharing-App
```
# 💸 Expense Sharing App

A full-stack **Expense Sharing Application** (similar to Splitwise) that allows users to create groups, add shared expenses, track balances, and settle dues.

This project is built using **React** for the frontend and **Spring Boot** for the backend, maintained in a single GitHub repository (monorepo).

---

## 🚀 Features

- User authentication
- Create and manage groups
- Add shared expenses
- Expense split types:
  - Equal split
  - Exact amount split
  - Percentage split
- Balance tracking:
  - How much you owe
  - How much others owe you
- Settle expenses
- Simplified balance calculations

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Spring Boot
- Java
- REST APIs
- JPA / Hibernate
- MySQL / PostgreSQL

---

## 📁 Project Structure

```

Expense Sharing App/
├── expense-sharing-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── expense-sharing-backend/
│   ├── src/
│   ├── pom.xml
│
└── README.md

```

---

## ▶️ How to Run the Project

### 1️⃣ Backend (Spring Boot)

- Open `expense-sharing-backend` in **Eclipse**
- Run as **Spring Boot App**
- Backend runs on:
```

http://localhost:8080

````

---

### 2️⃣ Frontend (React)

```bash
cd expense-sharing-frontend
npm install
npm start
````

* Frontend runs on:

```
http://localhost:3000
```

---

## 🔗 API Communication

* Frontend communicates with backend using REST APIs
* CORS is enabled in Spring Boot for frontend access

---

## 🧠 Learning Outcomes

* Full-stack application development
* REST API design
* React–Spring Boot integration
* Git & GitHub monorepo management

---

## 👨‍💻 Author

**Vamshi Jamkala**
B.Tech Student | Full Stack Developer

---

## 📌 Future Enhancements

* JWT-based authentication
* Email notifications
* Expense analytics
* Cloud deployment

```
