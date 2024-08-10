import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import "../style/footer.css";

const sections = [
  {
    title: "Solution",
    items: ["Marketing", "Analytics", "Commerce", "Data", "Cloud"],
  },
  {
    title: "Support",
    items: ["Pricing", "Documentation", "Guides", "API", "Status"],
  },
  {
    title: "Solution",
    items: ["Marketing", "Analytics", "Commerce", "Data", "Cloud"],
  },
  { title: "Company", items: ["About", "Blog", "Jobs", "Press", "Partners"] },
  {
    title: "Legal",
    items: ["Claims", "Privacy", "Terms", "Policies", "Conditions"],
  },
];

const items = [
  {
    name: "Facebook",
    icon: FaFacebook,
    link: " https://facebook.com/",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://instagram.com/",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    link: "https://twitter.com/",
  },
  {
    name: "Github",
    icon: FaGithub,
    link: "https://github.com/",
  },
];

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-sections">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="section-title">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="section-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="newsletter-section">
          <p className="newsletter-title">Subscribe to our newsletter</p>
          <p className="newsletter-description">
            The latest updates, articles, and resources, sent to your inbox
            weekly.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter email address"
              className="email-input"
            />
            <button className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-rights">2024 NC Tech, LLC. All rights reserved.</p>
        <div className="social-icons">
          {items.map((x, index) => (
            <a
              href={x.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <x.icon className="social-icon" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
