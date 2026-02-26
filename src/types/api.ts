export type ApiResponse<T> = {
  success: true;
  data: T;
  timestamp: string;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
};

export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
  timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
  message: string,
  code: string = "INTERNAL_SERVER_ERROR",
  details?: any
): ApiError => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
  timestamp: new Date().toISOString(),
});
