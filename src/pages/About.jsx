import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutCSS from "../css/About.module.css";
import data from "../Data";
import emailIcon from "../assets/icons/email.png";
import instagramIcon from "../assets/icons/instagram.png";

// Dynamically import the profile image
const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../assets/profile", false, /\.(webp|png|jpg|jpeg|gif)$/)
);

const profileImage = images.length > 0 ? images[0] : null;

function About() {
  const handleEmailClick = () => {
    const email = data.AboutEmail;
    const subject = data.AboutEmailSubject;
    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    emailLink.click();
  };

  const handleInstagramClick = () => {
    const instagramHandle = data.AboutInstagram;
    window.open(`https://www.instagram.com/${instagramHandle}`, "_blank");
  };

  return (
    <div className={AboutCSS.container}>
      <Header />
      <div className={AboutCSS.content}>
        <div className={AboutCSS.imageWrapper}>
          {profileImage && (
            <img
              src={profileImage}
              alt="Artist's Profile"
              className={AboutCSS.image}
            />
          )}
        </div>
        <div className={AboutCSS.textWrapper}>
          <h1>{data.AboutHeading}</h1>
          <p>{data.AboutTextParagraph1}</p>
          <p>{data.AboutTextParagraph2}</p>
          <div className={AboutCSS.socialIcons}>
            <a href="#" className={AboutCSS.iconLink} onClick={(e) => { e.preventDefault(); handleEmailClick(); }} style={{ textDecoration: 'none' }}>
              <img src={emailIcon} alt="Email" />
              <span className={AboutCSS.iconText}>{data.AboutEmail}</span>
            </a>
            <a href="#" className={AboutCSS.iconLink} onClick={(e) => { e.preventDefault(); handleInstagramClick(); }} style={{ textDecoration: 'none' }}>
              <img src={instagramIcon} alt="Instagram" />
              <span className={AboutCSS.iconText}>@{data.AboutInstagram}</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
