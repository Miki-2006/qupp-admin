import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { sendClientErrorResponse, sendErrorResponse, sendSuccessResponse } from "../responses/responses.js";

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredencials) => {
      const user = userCredencials.user;
      sendSuccessResponse(res, "Login successful", { user }, 200, req);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-credential') {
        sendClientErrorResponse(res, "Invalid credentials provided", 403, req);
      } else {
        sendErrorResponse(res, errorMessage, 500, req);
      }
    });
};

export const logoutAdmin = (req, res) => {
  const auth = getAuth();
  auth.signOut()
    .then(() => {
      sendSuccessResponse(res, "Logout successful", {}, 204, req);
    })
    .catch((error) => {
      sendErrorResponse(res, "Logout failed", 500, req);
    });
};