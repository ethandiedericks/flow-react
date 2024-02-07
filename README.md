
# Flow Finance

Flow Finance is a financial management system that allows users to track their income, expenses, and investments through a structured database model.

## ✅ Features

- Add new transactions
- Visualize your transactions
- Update & Delete transactions on the dashboard page
- Real-time updates with backend for CRUD operations

## 💡 Technologies Used

- **Frontend:**
  - ReactJS

- **Backend:**
  - Django
  - Django Rest Framework

## ⚙️ Setup -> Backend

To set up Flow Finance locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ethandiedericks/flow-react.git
   ```
2. Enter flow-react/backend directory:
   ```bash
   cd flow-react/backend
   ```
3. Create a virtual environment: (mac)
   ```bash
   python3 -m venv .venv
   ```
4. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```
5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Enter backend directory:
    ```bash
    cd backend
    ```
7. Create a copy of the .env.template file and name it .env:
   ```bash
   cp .env.template .env
   ```

8. Generate new Django secret key: 
    ```bash
    python generate_secret_key.py
    ```
9. Make migrations:
   ```bash
   python manage.py makemigrations
   ```
10. Apply migrations:
    ```bash
    python manage.py migrate
    ```
11. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```
12. Start the development server:
    ```bash
    python manage.py runserver
    ```
## ⚙️ Setup -> Frontend

1. Open seperate terminal and enter flow-react/frontend directory:
   ```bash
   cd flow-react/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the following command and go to the url:
   ```bash
   npm run dev
   ```
