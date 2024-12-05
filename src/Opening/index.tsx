import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Opening() {
  const [waveCount, setWaveCount] = useState(0);

  const handleWaveClick = () => {
    setWaveCount((prev) => prev + 1);
  };

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-sm mx-auto"
        style={{
          maxWidth: "500px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="card-body text-center p-4">
          <h2 className="text-danger mb-4">🏆 Kanbas Quiz Project 🎓</h2>

          <div className="mb-4">
            <h5 className="text-secondary">🚀 Seattle Squad 🌟</h5>
            <div className="text-muted">
              <p className="mb-1">Rohan Biju 👨‍💻</p>
              <p className="mb-1">Eric Kitagawa 🖥️</p>
              <p className="mb-3">Kevin Le 💡</p>
            </div>
          </div>

          <div className="row g-2 mb-3">
            <div className="col">
              <a
                href="https://github.com/your-server-repo"
                target="_blank"
                className="btn btn-outline-secondary w-100"
              >
                👨‍🔬 Server Repo
              </a>
            </div>
            <div className="col">
              <a
                href="https://github.com/your-react-repo"
                target="_blank"
                className="btn btn-outline-secondary w-100"
              >
                ⚛️ React Repo
              </a>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <span
              onClick={handleWaveClick}
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                display: "inline-block",
                transform: `rotate(${waveCount * 20}deg)`,
              }}
            >
              👋
            </span>
          </div>

          <a href="#/Kanbas" id="wd-k" className="btn btn-danger w-100">
            🚀 Launch Project
          </a>
        </div>
      </div>
    </div>
  );
}
