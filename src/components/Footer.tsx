import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Hanuel / Kyeoung Woon Park. All rights reserved.</p>

        <div className={'mt-1 space-x-4'}>
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
