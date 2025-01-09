"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserDashboard = ({ email }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated" && session?.user?.isAdmin === true) {
      router.push("/ob/obiku/admin/dashboard");
    }
  }, [status, session, router]);

  return <div>Dashboard</div>;
};

export default UserDashboard;
