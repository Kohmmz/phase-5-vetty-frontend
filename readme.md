# Vetty - Veterinary Services and Products E-commerce Application

## Project Overview
Vetty is a full-stack e-commerce application designed to provide veterinary services and products conveniently to users. The platform allows users to browse and order veterinary services such as pet grooming and vaccinations, as well as purchase pet-related products like food and accessories. Administrators can manage services, products, orders, and service requests through a dedicated admin interface.

## Features

### User Features
- User registration and login with authentication.
- Browse all available veterinary services and products.
- Add products to the shopping cart.
- Order veterinary services.
- View and manage cart items.
- Checkout and pay for services and products.
- View order history and service requests.

### Admin Features
- Admin login and authentication.
- Add, update, and delete veterinary services and products.
- Approve or disapprove service requests and product orders.
- View purchase and service request history.
- Manage orders and service requests efficiently.

## Technology Stack

### Frontend
- ReactJS for building the user interface.
- Redux Toolkit for state management.
- React Router for client-side routing.
- Axios for API communication.
- React Icons for UI icons.
- CSS modules and custom styles for responsive design.

### Backend
- Python Flask for RESTful API services.
- PostgreSQL as the relational database.
- JWT-based authentication and authorization.

### Development & Testing
- Vite as the frontend build tool.
- Jest and Minitests for frontend and backend testing respectively.
- Environment variables for configuration management.

## Project Structure

- `src/Components`: React components organized by feature (e.g., pages, admin, user).
- `src/redux`: Redux slices managing application state (cart, products, services, auth).
- `src/api`: Axios instance configured for API requests with authentication.
- `src/utils`: Utility functions such as currency formatting.
- `public`: Static assets like images and icons.
- `backend`: Flask backend service (not included in this repo).

## How It Works

1. **User Authentication**: Users register and log in to access personalized features. Auth tokens are stored and used for secure API requests.
2. **Browsing Services and Products**: Users can view detailed listings of veterinary services and products, including images, descriptions, and prices.
3. **Shopping Cart**: Users add products to their cart, update quantities, or remove items. The cart calculates totals dynamically.
4. **Checkout and Payment**: Users proceed to checkout, review order summaries, and complete payments securely.
5. **Admin Management**: Admins log in to manage inventory, approve orders and service requests, and view histories.

## Running the Project

### Frontend
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Access the app at `http://localhost:3000`.

### Backend
- The backend is a Flask API service (separate repository).
- Ensure the backend is running and accessible.
- Configure the frontend `.env` file with the backend API URL.

## Testing

- Frontend tests use Jest.
- Backend tests use Minitests.
- Run tests with:
  ```
  npm test
  ```

## Contribution

Contributions are welcome! Please fork the repository and submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

For any questions or support, please contact the project maintainer.
