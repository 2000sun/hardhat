import React from "react";
import Register from "./component/Register";
import { connectDB } from "@/util/database";
import Link from "next/link";

export const dynamic = "force-dynamic";

const page = async () => {
  const db = (await connectDB).db("signup");
  let result = await db.collection("user-info").find().toArray();
  console.log(result);

  return (
    <div className="list-bg">
      <Register result={result} />
    </div>
  );
};

export default page;
