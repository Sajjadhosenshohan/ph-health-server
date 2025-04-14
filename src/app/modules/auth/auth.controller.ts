import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const logInUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User login  successfully",
    data: {
      accessToken,
      needPasswordChange: needPasswordChange,
    },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  const result = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Refresh token ",
    data: result
  });
});

export const AuthController = {
  logInUser,
  refreshToken
};
