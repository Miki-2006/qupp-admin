import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../services/firebase.js";
import { sendSuccessResponse, sendClientErrorResponse, sendErrorResponse } from "../responses/responses.js";

export const setDailyQuoteVideo = async (req, res) => {
  const { url } = req.body;

  try {
    await updateDoc(doc(db, "dailyQuoteVideo", "SprPZPkraVLrgJj3kIZz"), {
      videoUrl: url,
    });
    const updatedDoc = await getDoc(
      doc(db, "dailyQuoteVideo", "SprPZPkraVLrgJj3kIZz")
    );
    sendSuccessResponse(
      res,
      "Daily quote video updated successfully",
      { videoUrl: updatedDoc.data().videoUrl },
      200,
      req
    );
  } catch (error) {
    if (error.code === "permission-denied") {
      sendClientErrorResponse(res, "Permission denied", 403, req);
    } else {
      sendErrorResponse(res, error.message, error.statusCode, req);
    }
  }
};
