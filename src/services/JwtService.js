import jwtDecode from "jwt-decode";

const saveUser = accessToken => {
  const decoded = jwtDecode(accessToken)
  const user = {
    "accessToken": accessToken,
    "userId": decoded["userId"],
    "authorities": decoded["authorities"],
    "email": decoded["sub"]
  }
  localStorage.setItem("user", JSON.stringify(user))
}

const JWTService = {
  saveUser
};

export default JWTService;