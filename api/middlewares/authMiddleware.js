import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({ message: "Auth Failed", success: false });
      } else {
        req.body.userId = decode.id;
        console.log("Decode Id", decode.id), next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "Auth Failed", success: false });
  }
};
