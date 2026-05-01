import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { CartProvider } from './CartContext.tsx';
import { ReviewProvider } from './ReviewContext.tsx';
import { UserProvider } from './UserContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ReviewProvider>
            <App />
          </ReviewProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
