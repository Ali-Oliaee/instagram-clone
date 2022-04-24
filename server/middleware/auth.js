import Jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const { TokenExpiredError } = Jwt;
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).send({ message: "No token provided!" });
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = Jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = Jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log("error", error);
    if (err instanceof TokenExpiredError) {
      return res
        .status(401)
        .send({ message: "Unauthorized! Access Token was expired!" });
    }
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default auth;
