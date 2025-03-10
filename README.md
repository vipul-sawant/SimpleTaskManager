# 📌 SimpleTaskManager (MERN Stack)

A full-stack Task Manager app with authentication, CRUD operations, and task status updates.  
Users can add, edit, delete, and mark tasks as complete/incomplete while ensuring unique task titles per user.  

## 🚀 Features  
- ✅ **User Authentication** (JWT-based login/register with bcrypt encryption)  
- ✅ **Session Persistence** (Keeps users logged in until session expires)  
- ✅ **Auth-Protected Routes** (Users cannot access/edit notes without authentication)  
- ✅ **Auto-Redirect on Session Expiry** (Redirects to login if token is invalid/expired)  
- ✅ **CRUD Operations** (Create, Edit, Delete notes with title validation)   
- ✅ **Task Status Management** (Pending/Complete)  
- ✅ **Form Validation** (Prevents empty fields & redundant updates)
- ✅ **Delete Confirmation** (Alerts before deleting a task)
- ✅ **Secure API** (Protected routes, backend validation, and CORS handling)
- ✅ **Task Sorting:**  
  - 📅 **Today's Tasks** → Shown first  
  - ⏳ **Overdue Tasks** → Shown next  
  - 🚀 **Upcoming Tasks** → Shown last  

## 🛠 Tech Stack  
- **Frontend:** React, Redux Toolkit, Bootstrap  
- **Backend:** Node.js, Express, MongoDB  
- **Auth:** JWT, Bcrypt

## 🚀 Live Demo  
🔗 [https://vipul-sawant.github.io/SimpleTaskManager](#)

## 📸 Screenshots  
*(Add a screenshot of your app here)*  

## 📦 Installation & Setup  

### 1️⃣ Clone the Repository  
```bash 
git clone https://github.com/vipul-sawant/SimpleTaskManager.git
cd SimpleTaskManager
```

### 2️⃣ Install Dependencies
*Backend*
```bash
cd back-end
npm install
```
*Frontend*
``` bash
cd front-end
npm install
```
### 3️⃣ Setup Environment Variables
> 1️⃣ Create a `.env` file inside the root of the `back-end` folder.  
> 2️⃣ Copy the exact variables from the `.env.sample` file.  
> 3️⃣ Do not change variable names—only replace placeholder values with your actual values.  
 

#### Run this command in the backend folder to create the `.env` file:  
```bash
cp .env.sample .env
```

### 4️⃣ Run the Application
*Backend (Runs on port 4000 or your port number)*

```bash
cd back-end
npm run dev
```

*Frontend (Runs on port 5173)*

```bash
cd front-end
npm run dev
```