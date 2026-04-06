import { NextFunction, Request, Response } from "express";
import { TokenPayload, verifyAccessToken } from "../utils/token.util";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// AUTHENTICATION
export const authentication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const requestHeader = req.headers.authorization;

    if (!requestHeader || !requestHeader.startsWith("Bearer")) {
      throw new AppError(401, "Unauthorized action");
    }

    const token = requestHeader?.split(" ")[1];

    const decoded = verifyAccessToken(token);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      fullName: decoded.fullName,
    };

    next();
  },
);

export const authorization = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user?.role as string)) {
      throw new AppError(403, "Access denied");
    }

    next();
  };
};
