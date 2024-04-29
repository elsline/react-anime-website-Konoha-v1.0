import profile from "../imgs/profile.jpg";

import Transition from "../components/Transition";

function About() {
  return (
    <Transition>
      <section className="about  ">
        <div className="container  ">
          <div className="prof d-flex flex-column justify-content-center  align-items-center ">
            <img className=" w-25  rounded-pill " alt="" src={profile}></img>
            <span className=" fw-medium fs-4 my-3">Ahmed Elsline</span>
            <div className="text-center mb-5">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/Elsline/"
                className="text-white me-4"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/ELSLINEE"
                className="text-white me-4"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/elsline__/"
                className="text-white me-4"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/elsline/"
                className="text-white me-4"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/elsline"
                className="text-white me-4"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  );
}
export default About;
