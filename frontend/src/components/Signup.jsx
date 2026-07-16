import { useState } from "react";
import { signupStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";

const SignUp = ({ API_URL = "http://localhost:7339", onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // To fetch profile
  const fetchProfile = async (token) => {
    if (!token) return null;
    const res = await axios.get(`${API_URL}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const persistAuth = (profile, token) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    try {
      if (token) storage.setItem("token", token);
      if (profile) storage.setItem("user", JSON.stringify(profile));
    } catch (error) {
      console.error("Error persisting auth data:", error);
    }
  };

  // To validate that all fields are filled by user or not
  return <div>SignUp</div>;
};

export default SignUp;
