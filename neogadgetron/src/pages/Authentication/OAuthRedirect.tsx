import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <div>Signing you in...</div>;
};

export default OAuthSuccess;
