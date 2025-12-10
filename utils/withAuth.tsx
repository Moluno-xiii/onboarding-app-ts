"use client";

import Loading from "@/app/Loading";
import { useAuth } from "@/contexts/Authcontext";
import { useRouter } from "next/navigation";
import { ComponentType, FC, useEffect } from "react";
import toast from "react-hot-toast";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ProtectedComponent: FC<P> = (props: P) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user === undefined || isLoading) return;
    }, [isLoading, user]);

    if (isLoading) return <Loading />;

    if (user === null) {
      toast.error("No session, login to access this page.");
      router.push("/");
    }
    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
