import styled from "styled-components";

const FooterDiv = styled.div`
  width: 100%;
  background-color: #1e1e1e;
  height: 500px;
  padding: 1.5rem 0;

  .__location {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 90%;
    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
    }
    .__contact {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      span {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 2.4rem;
        color: #94a3b8;

        :first-child {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 600;
          font-size: 3.5rem;
          color: #ed143d;
          @media (max-width: 768px) {
            font-size: 5rem;
          }
        }
      }
    }
    .__map {
      width: 30%;
      @media (max-width: 769px) {
        width: 80%;
      }
    }
  }
  .__copy_right {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 2.4rem;
    color: #94a3b8;
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterDiv>
      <div className="__location">
        <div className="__contact">
          <span>Office Location</span>
          <span>Tokha Road, Near Grande Sports Center</span>
          <span>www.grandesportscenter@gmail.com</span>
          <span>9861000000, 01-5159000</span>
        </div>
        <div className="__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14123.02321964359!2d85.3251206!3d27.755677!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1fe8c9bd8fbd%3A0x3dc67c91318e7a8f!2sHippies%20Park!5e0!3m2!1sen!2snp!4v1677306314558!5m2!1sen!2snp"
            width={"100%"}
            height="300"
            title="map"
            style={{ border: "0", borderRadius: "8px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <p className="__copy_right">copyright 2023, Rashman</p>
    </FooterDiv>
  );
};

export default Footer;
