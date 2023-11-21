import Register from "./component/Register";
import { connectDB } from "@/util/database";
// import MetaMask from "./MetaMask";

export const dynamic = "force-dynamic";

const page = async () => {
  const db = (await connectDB).db("signup");
  let result = await db.collection("user-info").find().toArray();
  console.log(result);

  return (
    <div className="list-bg">
      <Register result={result} />
      {/* <MetaMask /> */}
    </div>
  );
};

export default page;
