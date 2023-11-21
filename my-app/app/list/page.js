import React from "react";
import ListItem from "./ListItem";
import { connectDB } from "@/util/database";
import Link from "next/link";

export const dynamic = "force-dynamic";

const page = async () => {
  const db = (await connectDB).db("signup");
  let result = await db.collection("post").find().toArray();
  console.log(result);

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
};

export default page;
