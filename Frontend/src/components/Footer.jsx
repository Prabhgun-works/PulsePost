import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__about">
          <h3>About Us</h3>
          <p>
            This platform is a volunteer-driven initiative designed to connect those in urgent need of blood with willing donors.
            We do not guarantee availability or outcomes, and are not liable for any incidents, delays, or mismatches. Always verify before proceeding.
          </p>
        </div>

        <div className="footer__legal">
          <h3>Disclaimer</h3>
          <p>
            By using this platform, you acknowledge that it is a community-based tool and not a certified medical service.
            Any engagement or donation is purely at your own risk and discretion.
          </p>
        </div>

        <div className="footer__contact">
          <h3>Contact & Support</h3>
          <p>Email: support@lifelink.org</p>
          <p>Emergency Helpline: 1800-XXX-XXXX</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} LifeLink. All rights reserved.</p>
      </div>
    </footer>
  );
}