
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const placeOrder = async (user: any, cart: any[], total: number) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      userId: user.uid,
      email: user.email,
      items: cart,
      totalAmount: total,
      status: "placed", // better than "paid" for COD
      createdAt: serverTimestamp(),
    });

    console.log("ORDER SAVED ID:", docRef.id);

    return docRef;
  } catch (error) {
    console.error("FIRESTORE ERROR:", error);
    throw error;
  }
};