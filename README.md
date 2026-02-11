<p align="center">
  <a href="https://github.com/koojennie/loubilux" target="_blank">
    <img src="https://raw.githubusercontent.com/koojennie/loubilux/b811267be47d3401d55dd6d23395158906152f68/frontend/public/icon/loubishop-brown.svg" width="280" alt="Loubishop Logo" />
  </a>
</p>

# 👜 Loubishop

<img src="https://raw.githubusercontent.com/koojennie/loubilux/refs/heads/main/frontend/public/img/loubishop.png" alt="Loubishop Website Preview" />

**Loubishop** is a premium **personal shopper (jastip) platform from Germany**, specializing in **authentic branded products** sourced directly from Europe. Based in **Depok, Indonesia**, Loubishop serves customers through both its own website and trusted Indonesian marketplaces such as **Tokopedia** and **Shopee**.

All items sold on Loubishop are **100% original, authentic, and preloved** — **no counterfeit (KW) products**.

---

## 🚀 About Loubishop

Loubishop was built to provide a safe and transparent way for customers to purchase luxury branded items from Europe without worrying about authenticity. The platform supports a full e-commerce flow — from product discovery to secure checkout — combined with flexible delivery options such as **Cash on Delivery (COD)**.

The system is designed with a **modern tech stack**, scalable architecture, and a **custom admin dashboard** tailored for real-world store operations.

---

## ✨ Key Features

### 👤 User Features

* 🔐 **Authentication & User Account**
  Secure login and user session management.

* 🧑‍💼 **User Dashboard**
  Includes:

  * Profile settings
  * Address management (save multiple addresses)
  * Shopping history & order tracking

* 📍 **Multiple Address Management**
  Users can:

  * Save multiple addresses
  * Select one address during checkout

* 🛍️ **Product Catalog & Search**

  * Filter products by category and price
  * JavaScript-powered search bar

* 🛒 **Shopping Cart & Checkout**

  * Add products to cart
  * Review order summary before payment
  * Choose delivery address

* 💳 **Payment Integration (Midtrans Sandbox)**

  * Integrated with **Midtrans** (sandbox mode)
  * After successful payment, users are redirected to **order history** page

* 📦 **Order History & Status**
  View completed and ongoing orders directly from the user account page.

---

### 🛠️ Admin Features

* 📊 **Custom Admin Dashboard**
  Fully customized dashboard UI (not default template).

* 👑 **Role-Based Access Control**

  * **Super Admin**: manage users, products, orders, categories, and stock opname
  * **Admin**: manage products, orders, categories, and stock opname

* 🧾 **Product & Order Management**

  * Manage products
  * Manage orders
  * Stock opname
  * Category management

---

## 🧴 Product Categories

Loubishop focuses on **luxury branded items**, including:

* Bags
* Shoes
* Watches
* Wallets

All products are **authentic preloved items imported from Europe**.

---

## 📍 Business Coverage

* 🇩🇪 Sourced from: **Germany / Europe**
* 🇮🇩 Based in: **Depok, Indonesia**
* 🚚 Delivery Options:

  * Cash on Delivery (COD)
  * Marketplace fulfillment (Tokopedia & Shopee)

---

## ⚙️ Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* Supabase (PostgreSQL)

### Additional Services

* ☁️ **Supabase** – Database & authentication
* 🖼️ **Cloudinary** – Image upload, storage, and delivery optimization
* 💳 **Midtrans** – Payment gateway (sandbox mode)

---

## 📱 Responsive Design

* Fully responsive frontend
* Optimized for desktop, tablet, and mobile devices
* Clean, minimalist UI using Tailwind CSS

---

## 👤 User

- **Admin:** adminloubi Admin.123
- **User 1:** jennie Jennie.123
- **User 2:** aliajennie Alia.123

---

## 🚀 Getting Started

Follow the steps below to install and run Loubishop locally.

**Installation & Execution Steps**

1.  Extract and place the project folder
    
    Extract and copy the loubishop project folder into your working directory, for example:
    
    ```powershell
    C:\Users\kim\Documents\loubishop
    ```

2.  Open the project using Visual Studio Code
    
    Open Command Prompt in the project directory, then run:

    ```powershell
    code .
    ```

3.  Install dependencies

    Open the Visual Studio Code terminal and run:

    ```powershell
    npm install
    ```

4.  Navigate to backend directory

    ```powershell
    cd backend
    ```

5.  Create backend environment file
    
    Create a new file named .env inside the backend directory, then copy the configuration below:

    ```powershell
    JWT_SECRET=86b662b4f00f418e8a9fb4cd40b2497e32811f99b5db3c8fcf23d830fca6740d

    CLOUDINARY_URL=cloudinary://496649482931383:70C0xWwPcdYNJ0HrzG3ZYyFb5h0@dqjlprqcyx
    CLOUDINARY_API_KEY=496649482931383
    CLOUDINARY_API_SECRET=70C0xWwPcdYNJ0HrzG3ZYyFb5h0
    CLOUDINARY_CLOUD_NAME=dqjlprqcy

    FRONTED_URL="http://localhost:3000"

    SERVERKEY_MIDTRANS=SB-Mid-server-ejpmqDkPMYgvBmTzqqS-rzWu

    POSTGRES_DB_NAME=postgres
    POSTGRES_DB_USER=postgres.fhydlfpttsikusdupxpp
    POSTGRES_DB_PASS=230710alwayshao
    POSTGRES_DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
    POSTGRES_DB_PORT=5432
    POSTGRES_DB_DRIVER=postgres
    ```

6.  Run backend server

    ```powershell
    npm run dev
    ```

7.  Open a new terminal and navigate to frontend

    ```powershell
    cd frontend
    ```

8.  Create frontend environment file

    Create a new file named .env.local inside the frontend directory, then add:

    ```powershell
    NEXT_PUBLIC_API_BASE_URL='http://localhost:5000'
    ```

9.  Run frontend development server

    ```powershell
    npm run dev
    ```

    Once both servers are running, open your browser and access the application via:

    ```powershell
    http://localhost:3000
    ```

---

## 📂 Repository Structure (High-Level)

```
loubilux
├─ backend
├─ frontend
├─ public
├─ supabase
├─ .env.example
├─ package.json
└─ README.md
```

---

## 🙌 Contribution

Contributions, suggestions, and improvements are welcome.

You can:

* Fork this repository
* Create a feature branch
* Submit a Pull Request
* Open an Issue for discussion

---

## 📄 License

This project is open-source and available under the **MIT License**.

Built with ❤️ to deliver trusted luxury shopping experiences from Europe.