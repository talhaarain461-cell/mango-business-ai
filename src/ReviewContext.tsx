import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface Review {
  id: string;
  productId: string;
  productName: string;
  name: string;
  rating: number;
  message: string;
  date: string;
  images?: string[];
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Review) => Promise<void>;
  getReviewsByProduct: (productId: string) => Review[];
  getProductRating: (productId: string) => { average: number; count: number };
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from Firebase
  const fetchReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "reviews"));
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as Review),
        id: doc.id,
      }));
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Add review to Firebase
  const addReview = async (review: Review) => {
    try {
      const docRef = await addDoc(collection(db, "reviews"), review);

      setReviews((prev) => [
        { ...review, id: docRef.id },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const getReviewsByProduct = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const getProductRating = (productId: string) => {
    const productReviews = reviews.filter((r) => r.productId === productId);

    if (productReviews.length === 0) {
      return { average: 0, count: 0 };
    }

    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);

    return {
      average: Number((sum / productReviews.length).toFixed(1)),
      count: productReviews.length,
    };
  };

  return (
    <ReviewContext.Provider
      value={{ reviews, addReview, getReviewsByProduct, getProductRating }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within ReviewProvider");
  }
  return context;
}