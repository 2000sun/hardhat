import Register from "./component/Register";
import { connectDB } from "@/util/database";
export const dynamic = "force-dynamic";

const page = async () => {
  // 몽고디비에서 signup 데이터베이스를 가져옴
  const db = (await connectDB).db("signup");

  //user-info 컬렉션을 모두 가져옴
  let result = await db.collection("user-info").find().toArray();

  return (
    <div className="main-container">
      <div>
        <h1 className="main-name">
          <img
            className="hardhat-img"
            src="/hard-hat.png"
            width={30}
            height={30}
          />
          HardHat-CRUD-Project
        </h1>
      </div>

      <div className="register-container">
        {/* 회원가입을 위한 컴포넌트 */}
        <Register result={result} />
      </div>
    </div>
  );
};

export default page;
