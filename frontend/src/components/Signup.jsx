import { useState } from "react";
import { signupStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import axios from "axios";

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
      const data = res.data || {};
      const token = data.token ?? null;
      let profile = data.user ?? null;
      if (!profile) {
        // check for any extra fields returned that could be user info
        const copy = { ...data };
        delete copy.token;
        delete copy.user;
        if (Object.keys(copy).length) profile = copy;
      }

      if (!profile && token) {
        try {
          profile = await fetchProfile(token);
        } catch (fetchErr) {
          console.warn("Could not fetch profile after signup token:", fetchErr);
          profile = null;
        }
      }

      if (!profile) profile = { name, email };
      persistAuth(profile, token);
      if (typeof onSignup === "function") {
        try {
          onSignup(profile, rememberMe, token);
        } catch (callErr) {
          console.warn("onSignup threw:", callErr);
          navigate("/");
        }
      } else {
        navigate("/");
      }
      setPassword("");
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

        <div className={signupStyles.formContainer}>
          {errors.api && <p className={signupStyles.apiError}></p>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <label htmlFor="name" className={signupStyles.label}>
                Full Name
              </label>
              <div className={signupStyles.inputContainer}>
                <div className={signupStyles.inputIcon}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${signupStyles.input} ${errors.name ? "border-red-400" : "border-gray-400"}`}
                  placeholder="e.g. John Doe"
                />
              </div>

              {errors.name && (
                <p className={signupStyles.fieldError}>{errors.name}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="name" className={signupStyles.label}>
                Email Address
              </label>
              <div className={signupStyles.inputContainer}>
                <div className={signupStyles.inputIcon}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${signupStyles.input} ${errors.email ? "border-red-400" : "border-gray-400"}`}
                  placeholder="youremail@example.com"
                />
              </div>

              {errors.email && (
                <p className={signupStyles.fieldError}>{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className={signupStyles.label}>
                Password
              </label>
              <div className={signupStyles.inputContainer}>
                <div className={signupStyles.inputIcon}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${signupStyles.passwordInput} ${errors.password ? "border-red-400" : "border-gray-400"}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={signupStyles.passwordToggle}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className={signupStyles.fieldError}>{errors.password}</p>
              )}
            </div>

            <div className={signupStyles.checkboxContainer}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`${signupStyles.input} ${errors.email ? "border-red-400" : "border-gray-400"}`}
                placeholder="youremail@example.com"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
