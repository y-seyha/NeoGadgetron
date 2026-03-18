import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function SocialButton() {
  const API = import.meta.env.VITE_API_URL;

  const handleRedirect = (provider: string) => {
    if (!API) {
      console.error("API URL not defined");
      return;
    }

    window.location.href = `${API}/auth/${provider}`;
  };

  return (
    <div className="grid gap-3 w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full h-11"
        onClick={() => handleRedirect("google")}
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11"
        onClick={() => handleRedirect("facebook")}
      >
        <FaFacebook size={20} className="text-blue-600" />
        Continue with Facebook
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11"
        onClick={() => handleRedirect("github")}
      >
        <FaGithub size={20} />
        Continue with GitHub
      </Button>
    </div>
  );
}
