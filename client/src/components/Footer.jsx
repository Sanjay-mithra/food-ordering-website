import React from 'react';

function Footer() {
  return (
    <footer className="bg-orange-500 text-white p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
        {/* Services */}
        <nav className="w-full sm:w-auto">
          <h6 className="footer-title font-semibold mb-2">Services</h6>
          <ul className="space-y-1">
            <li><a className="text-white hover:underline">Branding</a></li>
            <li><a className="text-white hover:underline">Design</a></li>
            <li><a className="text-white hover:underline">Marketing</a></li>
            <li><a className="text-white hover:underline">Advertisement</a></li>
          </ul>
        </nav>

        {/* Company */}
        <nav className="w-full sm:w-auto">
          <h6 className="footer-title font-semibold mb-2">Company</h6>
          <ul className="space-y-1">
            <li><a className="text-white hover:underline">About us</a></li>
            <li><a className="text-white hover:underline">Contact</a></li>
            <li><a className="text-white hover:underline">Jobs</a></li>
            <li><a className="text-white hover:underline">Press kit</a></li>
          </ul>
        </nav>

        {/* Social */}
        <nav className="w-full sm:w-auto">
          <h6 className="footer-title font-semibold mb-2">Social</h6>
          <div className="flex gap-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" alt="X" width="24" height="24" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" width="24" height="24" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" width="24" height="24" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
