import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-orange-500 text-white rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover text-white">About us</a>
          <a className="link link-hover text-white">Contact</a>
          <a className="link link-hover text-white">Jobs</a>
          <a className="link link-hover text-white">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a className="text-white">
              {/* Twitter Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                <path d="M24 4.557c-0.883 0.392-1.832 0.656-2.828 0.775 1.017-0.609 1.798-1.574 2.165-2.724-0.951 0.564-2.005 0.974-3.127 1.195-0.897-0.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-0.205-7.719-2.165-10.148-5.144-1.29 2.213-0.669 5.108 1.523 6.574-0.806-0.026-1.566-0.247-2.229-0.616-0.054 2.281 1.581 4.415 3.949 4.89-0.693 0.188-1.452 0.232-2.224 0.084 0.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646 0.962-0.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a className="text-white">
              {/* YouTube Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                <path d="M19.615 3.184c-3.604-0.246-11.631-0.245-15.23 0-3.897 0.266-4.356 2.62-4.385 8.816 0.029 6.185 0.484 8.549 4.385 8.816 3.6 0.245 11.626 0.246 15.23 0 3.897-0.266 4.356-2.62 4.385-8.816-0.029-6.185-0.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a className="text-white">
              {/* Facebook Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l0.358-4h-4v-1.667c0-0.955 0.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p className="text-white">
            Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
