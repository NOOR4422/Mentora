import React from "react";
import "./AboutUsBody.css";
import Aboutus from "../../../assets/aboutUs.png";
import aboutus1 from "../../../assets/aboutus1.png";
import aboutus2 from "../../../assets/aboutus2.png";
import aboutus3 from "../../../assets/aboutus3.png";
import aboutus4 from "../../../assets/aboutus4.png";
import aboutus5 from "../../../assets/aboutus5.png";
function AboutUsBody() {
  return (
    <div className="AboutUss-container">
      <div className="aboutUs-content">
        <div className="top-container">
          <img className="top-image" src={Aboutus} alt="Top Image" />
        </div>
        <div className="content-container">
          <div className="header-content">
            <h2>Welcome to Mentora: Your Personalized Mentorship Platform</h2>
            <p>
              Mentora is your go-to destination for personalized mentorship in
              any field you're passionate about. Created by a group of dedicated
              students, Mentora is here to make learning and growth accessible
              to everyone.
            </p>
          </div>
          <div className="div-content">
            <div className="background-image-container">
              <div className="text-content">
                <p>
                  <strong> Our Mission: </strong> To connect eager learners with
                  experienced mentors, fostering a culture of collaboration and
                  personal development.
                </p>
              </div>
              <img  className="background-image" src={aboutus1} alt="Background Image"/>
            </div>
            <div className="background-image-container">
              <img
                className="background-image"
                src={aboutus2}
                alt="Background Image"
              />{" "}
              <div className="text-content">
                <p>
                  <strong>Who We Are:</strong> We're a team of students who
                  believe in the power of mentorship to transform lives. With
                  Mentora, we're on a mission to make mentorship easy,
                  accessible, and impactful for everyone.
                </p>
              </div>
            </div>

            <div className="background-image-container">
              <div className="text-content">
                <p>
                  <strong>Why Mentora:</strong> Our platform is built on
                  principles of inclusivity, accessibility, and personalized
                  learning. We're here to help you reach your full potential, no
                  matter where you are on your journey.
                </p>
              </div>
              <img className="background-image" src={aboutus3} alt="Background Image" />
            </div>
            <div className="background-image-container">
              <img
                className="background-image"
                src={aboutus4}
                alt="Background Image"
              />{" "}
              <div className="text-content">
                <p>
                  <strong>How It Works: </strong> Sign up, choose your mentor,
                  and start your journey towards your goals. Whether you're a
                  student, a professional, or an enthusiast, Mentora has the
                  mentor for you.
                </p>
              </div>
            </div>
            <div className="background-image-container">
              <div className="text-content">
                <p>
                 <strong> Join Us:</strong> Ready to embark on your mentorship journey? Sign up
                  for Mentora today and unlock the power of mentorship.{" "}
                </p>
              </div>
              <img
                className="background-image"
                src={aboutus5}
                alt="Background Image"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsBody;
