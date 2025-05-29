import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="aboutImg" />
        </div>
        <div className="banner">
          <p id="bio">Biography</p>
          <h3>Who We Are</h3>
          <p id="Biography">
            TrustCare Medical Institute is an advanced healthcare facility dedicated to the provision of comprehensive medical services. Our esteemed team of highly skilled professionals is unwavering in their commitment to delivering personalized care, meticulously tailored to address the unique needs of each patient. At TrustCare, we prioritize the well-being of our patients, ensuring a seamless and harmonious journey towards optimal health and wellness. Our mission is to provide exceptional medical care with the utmost expertise and compassion, fostering an environment of trust and excellence.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;