import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../services/firebase.js";
import { sendClientErrorResponse, sendErrorResponse, sendSuccessResponse } from "../responses/responses.js";

export const fetchAllQuotes = async (req, res) => {
  try {
    const col = collection(db, "quotes");
    const quotesSnap = await getDocs(col);
    const quotes = [];
    if (quotesSnap) {
      quotesSnap.docs.map((doc) => {
        quotes.push({ id: doc.id, ...doc.data() });
      });
      sendSuccessResponse(res, "Quotes fetched successfully", { quotes }, 200, req);
    } else {
      sendClientErrorResponse(res, "No quotes found", 404, req);
    }
  } catch (error) {
    if (error.code === 'permission-denied') {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }
  }
};

export const addNewQuote = async (req, res) => {
  const { quote, author, category } = req.body;
  if (quote === null || author === null || category === null) {
    sendClientErrorResponse(res, "Quote, author, and category are required", 400, req);
    return;
  }
  try {
    const newQuote = await addDoc(collection(db, "quotes"), {
      quote: quote,
      author: author,
      category: category,
    });
    if (newQuote) {
      sendSuccessResponse(res, "Quote added successfully", { id: newQuote.id, quote, author, category }, 201, req);
    }
  } catch (error) {
    if (error.code === 'permission-denied') {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else if (error.code === 'invalid-argument') {
      sendClientErrorResponse(res, "Invalid data provided", 400, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }
    
  }
};

export const fetchByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const q = query(
      collection(db, "quotes"),
      where("category", "==", category)
    );
    const quotesSnap = await getDocs(q);
    const quotes = [];
    if (quotesSnap) {
      quotesSnap.forEach((doc) => {
        quotes.push({ id: doc.id, ...doc.data() });
      });
      sendSuccessResponse(res, "Quotes fetched successfully", { quotes }, 200, req);
    }
  } catch (error) {
    if (error.code === 'permission-denied') {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }    
  }
};

export const editQuote = async (req, res) => {
  const { id } = req.params;
  const { quote } = req.body;
  try {
    await updateDoc(doc(db, "quotes", id), {
      quote: quote
    });
    const updatedQuote =  await getDoc(doc(db, "quotes", id));
    sendSuccessResponse(res, "Quote updated successfully", updatedQuote.data(), 200, req);
  } catch (error) {
    if (error.code === 'permission-denied') {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }    
  }
};

export const setDailyQuote = async (req, res) => {
  const { id } = req.body;
  try {
    await updateDoc(doc(db, "dailyQuote", "A0ra9K9mT1COqJjJfnPf"), {
      quote_id: id,
    });
    const setDailyQuote = await getDoc(doc(db, "dailyQuote", "A0ra9K9mT1COqJjJfnPf"));
    sendSuccessResponse(res, "Daily quote set successfully", setDailyQuote.data(), 200, req);
  } catch (error) {
    if (error.code === 'permission-denied') {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }
  }
};

export const editCategoryOfQuote = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  try {
    await updateDoc(doc(db, "quotes", id), {
      category: category,     
    });    
    const updatedCategoryQuote = await getDoc(doc(db, "quotes", id));
    sendSuccessResponse(res, "Quote category updated successfully", updatedCategoryQuote.data(), 200, req);
  } catch (error) {
    if (error.code === 'permission-denied') {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }
  }
};

export const deleteQuote = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDoc(doc(db, "quotes", id));
    sendSuccessResponse(res, "Quote deleted successfully", {}, 204, req);
  } catch (error) {
    if (error.code === 'permission-denied') {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }
  }
};
