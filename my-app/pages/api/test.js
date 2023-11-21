export default function handler(req, res) {
  console.log("삭제 테스트 성공임");
  return res.status(200).json("삭제 테스트 성공했음");
}
