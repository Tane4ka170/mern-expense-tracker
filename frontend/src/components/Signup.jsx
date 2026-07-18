import { useState } from "react";
import { signupStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

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
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // To signup user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/user/register`,
        {
          name,
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } },
      );
    } catch (err) {
      console.error("Signup error:", err?.response || err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors({ api: err.response.data.message });
      } else {
        setErrors({ api: err.message || "An unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={signupStyles.pageContainer}>
      <div className={signupStyles.cardContainer}>
        <div className={signupStyles.header}>
          <button
            onClick={() => navigate(-1)}
            className={signupStyles.backButton}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className={signupStyles.avatar}>
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className={signupStyles.headerTitle}>Sign Up</h1>
          <p className={signupStyles.headerSubtitle}>
            Take control of your money with ExpenseTracker
          </p>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default SignUp;
