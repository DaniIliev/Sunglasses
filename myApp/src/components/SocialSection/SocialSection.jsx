// import React from "react";
// import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
// import "./SocialSection.css"; // Важно: добави CSS файла

// const SocialSection = () => {
//   return (
//     <section className="social-section">
//       <h2 className="social-title">Последвай ни в социалните мрежи</h2>
//       <div className="social-icons">
//         <a
//           href="https://www.instagram.com/vistoptics?igsh=emZ1aTR0eGh4NDM0&utm_source=qr"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="social-icon instagram"
//         >
//           <FaInstagram />
//         </a>
//         <a
//           href="https://facebook.com/yourprofile"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="social-icon facebook"
//         >
//           <FaFacebookF />
//         </a>
//         <a
//           href="https://tiktok.com/@yourprofile"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="social-icon tiktok"
//         >
//           <FaTiktok />
//         </a>
//       </div>
//     </section>
//   );
// };

// export default SocialSection;

import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import "./SocialSection.css";

const SocialSection = () => {
  return (
    <section className="social-section">
      <h2 className="social-title">Свържи се с нас в социалните мрежи</h2>
      <div className="social-grid">
        {/* Instagram */}
        <div className="social-card">
        <a
            href="https://www.instagram.com/vistoptics?igsh=emZ1aTR0eGh4NDM0&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card-link"
        >
          <FaInstagram className="social-card-icon instagram" />
          <h3>@vistoptics</h3>
          <div className="social-thumbnails">
            <img src="/ins1.jpeg" alt="Insta 1" />
            <img src="/ins2.jpeg" alt="Insta 2" />
            <img src="/inst3.jpeg" alt="Insta 3" />
          </div>
        </a>
        </div>

        {/* Facebook */}
        <div className="social-card">
        <a
            href="https://www.facebook.com/people/Vist-Optics/61576085458561"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card-link"
         >
          <FaFacebookF className="social-card-icon facebook" />
          <h3>Vist Optics </h3>
          <div className="social-thumbnails">
            <img src="/fb1.jpeg" alt="FB 1" />
            <img src="/fb2.jpeg" alt="FB 2" />
            <img src="/fb3.jpeg" alt="FB 3" />
          </div>
        </a>
        </div>

        {/* TikTok */}
        <div className="social-card" >
        <a
            href="https://tiktok.com/@yourtiktok"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card-link"
        >
          <FaTiktok className="social-card-icon tiktok" />
          <h3>@yourtiktok</h3>
          <div className="social-thumbnails">
            <img src="/tiktok1.jpeg" alt="TikTok 1" />
            <img src="/tiktok2.png" alt="TikTok 2" />
            <img src="/tiktok3.jpeg" alt="TikTok 3" />
          </div>
        </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
