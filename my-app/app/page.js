import Register from "./component/Register";
import { connectDB } from "@/util/database";
export const dynamic = "force-dynamic";

const page = async () => {
  const db = (await connectDB).db("signup");
  let result = await db.collection("user-info").find().toArray();
  console.log(result);

  return (
    <div className="main-container">
      <h1 className="main-name">HardHat-CRUD-PortFolio</h1>
      <div className="register-container">
        <Register result={result} />
      </div>
    </div>
  );
};

export default page;
