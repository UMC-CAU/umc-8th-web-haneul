import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Hanuel / Kyeoung Woon Park. All rights reserved.</p>

        <div className={"space-x-4 mt-1"}>
          <Link to="#" className="text-blue-400 hover:underline">
            Terms of Service
          </Link>
          <Link to="#" className="text-blue-400 hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="text-blue-400 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
