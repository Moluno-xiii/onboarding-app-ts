import React from "react";
import DashboardSidebar from "../_components/ui/DashboardSidebar";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 p-5 md:grid-cols-[200px_1fr]"
    >
      <DashboardSidebar />
      <main className="bg-light-brown-gray w-full">{children}</main>
    </div>
  );
}
