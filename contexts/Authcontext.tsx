"use client";

import { emailRegex } from "@/constants";
import { supabase } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type AuthContextType = {
  user: User | null | undefined;
  isLoading: boolean;
  signup: (data: {
    userEmail: string;
    userPassword: string;
    confirmPassword: string;
    displayName: string;
    setErrorCb: SetErrorCb;
  }) => void;
  login: (data: {
    userEmail: string;
    userPassword: string;
    setErrorCb: SetErrorCb;
  }) => void;
  logout: () => void;
  resetPassword: (data: {
    password: string;
    confirmPassword: string;
    email: string;
  }) => void;
};
const AuthContext = createContext<undefined | AuthContextType>(undefined);

type SetErrorCb = Dispatch<SetStateAction<string | null>>;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getCurentUser() {
      try {
        setIsLoading(true);
        const user = await getUser();
        console.log("auth context user", user);
        if (user) {
          setUser(user);
          return;
        }
        setUser(null);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unexpected error, login and try again.";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }

    getCurentUser();
  }, []);

  const getUser = async (): Promise<User | null> => {
    const { error, data } = await supabase.auth.getUser();
    if (error) {
      console.log("get user error", error.message);
      return null;
    }
    return data.user;
  };

  const signup = async (data: {
    userEmail: string;
    userPassword: string;
    confirmPassword: string;
    displayName: string;
    setErrorCb: SetErrorCb;
  }) => {
    try {
      setIsLoading(true);
      data.setErrorCb(null);
      if (!emailRegex.test(data.userEmail)) {
        data.setErrorCb("Invalid email");
        return;
      }
      if (data.userPassword !== data.confirmPassword) {
        data.setErrorCb("Both password fields must match");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: data.userEmail,
        password: data.userPassword,
        options: {
          data: {
            displayName: data.displayName,
          },
        },
      });

      if (error) throw new Error(error.message);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      data.setErrorCb(message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: {
    userEmail: string;
    userPassword: string;
    setErrorCb: SetErrorCb;
  }) => {
    try {
      setIsLoading(true);
      data.setErrorCb(null);
      if (!emailRegex.test(data.userEmail)) {
        data.setErrorCb("Invalid email");
        return;
      }
      const { error, data: loginData } = await supabase.auth.signInWithPassword(
        {
          email: data.userEmail,
          password: data.userPassword,
        },
      );

      if (error) throw new Error(error.message);
      router.push("/dashboard");
      setUser(loginData.user);
      toast.success("Login successful");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      data.setErrorCb(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      router.push("/");
      toast.success("Logout successful");
      setUser(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: {
    password: string;
    confirmPassword: string;
    email: string;
  }) => {
    try {
      setIsLoading(true);
      if (data.password !== data.confirmPassword) {
        throw new Error("Password fields do not match");
      }
      const { error } = await supabase.auth.updateUser({
        email: data.email,
        password: data.password,
      });

      if (error) throw new Error(error.message);
      toast.success("Pasword reset successful");
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const returnValues = {
    user,
    login,
    logout,
    isLoading,
    signup,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={returnValues}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("authcontext was used outside its scope");
  return context;
};

export { useAuth };
export default AuthProvider;
