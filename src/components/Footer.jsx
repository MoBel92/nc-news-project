import React from "react";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright">
        <p>
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </p>
      </div>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Email: contact@example.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </footer>
  );
};

export default Footer;
