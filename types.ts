type LoginReturnType = {
  error: { password: null | string; email: string | null };
  success: boolean;
};

type LogoutReturnType = {
  error: { message: string | null };
  success: boolean;
};

export type { LoginReturnType, LogoutReturnType };
