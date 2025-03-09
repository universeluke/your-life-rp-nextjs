import { Download, MessageCircle, PlayCircle } from "lucide-react";
import "./JoinNow.css";

const JoinNow: React.FC = () => {
  return (
    <section id="join" className="join-section">
      <div className="overlay"></div>
      <div className="container">
        <h2 className="title">Ready to Start Your New Life?</h2>
        <div className="steps-container">
          <div className="step-card">
            <Download className="step-icon blue" />
            <h3 className="step-title">1. Download FiveM</h3>
            <p className="step-description">
              Get the FiveM client from the official website
            </p>
          </div>
          <div className="step-card">
            <MessageCircle className="step-icon purple" />
            <h3 className="step-title">2. Join Our Discord</h3>
            <p className="step-description">
              Connect with the community and get server updates
            </p>
          </div>
          <div className="step-card">
            <PlayCircle className="step-icon blue" />
            <h3 className="step-title">3. Connect to Server</h3>
            <p className="step-description">
              Use our server IP to join and start your new life!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinNow;
