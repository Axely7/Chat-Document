import React from "react";
// @ts-ignore-next-line
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Dashboard = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  return <div>{user.email}</div>;
};

export default Dashboard;
