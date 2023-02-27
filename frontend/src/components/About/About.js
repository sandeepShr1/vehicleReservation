import styled from "styled-components";
import bg from "../../assets/about.jpg";
import messi from "../../assets/m.jpg";
import jonny from "../../assets/j.jpg";
import david from "../../assets/b.jpg";
import Footer from "../Footer/Footer";

const AboutDiv = styled.div`
  padding-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  .__banner_about {
    background-image: url(${(props) => props.bg});
    object-fit: contain;
    width: 100%;
    height: max-content;

    p {
      padding-top: 2rem;
      background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      opacity: 0.8;
      border-radius: 0px 0px 17px 20px;
      text-align: center;
      font-weight: 600;
      font-size: 4.5rem;
      color: #d6d6d6;
    }
    div {
      width: 50%;
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15rem 0;
      @media (max-width: 769px) {
        width: 100%;
        padding: 9rem 0;
      }
      span {
        display: inline-block;
        font-weight: 400;
        font-size: 1.7rem;
        color: #ffffff;
        width: 50rem;
        @media (max-width: 769px) {
          width: 80%;
        }
      }
    }
  }
  .__teams {
    width: 80%;
    padding: 2rem 0;
    p {
      font-weight: 600;
      font-size: 4.8rem;
      text-align: center;
      color: #1e1e1e;
    }
    .__teams_member {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 3rem;
      margin: 1rem 0;
      width: 100%;
      div {
        .__card {
          flex-grow: 1;
          flex-shrink: 0;
          flex-basis: calc(25% - 10px);
          cursor: pointer;
          transform: scale(1, 1);
          transition: transform 0.5s ease;
          color: #324d67;
          :hover {
            transform: scale(1.1, 1.1);
          }
          img {
            border-radius: 8px;
            background-color: #ebebeb;
            transform: scale(1, 1);
            transition: transform 0.5s ease;
            object-fit: cover;
          }
          p {
            font-weight: 600;
            font-size: 2.4rem;
            color: #1e1e1e;
            margin-top: 6px;
          }
        }
      }
    }
  }
`;
const members = [
  { name: "Rashman", src: messi },
  { name: "David", src: david },
  { name: "Jonny", src: jonny },
];

const About = () => {
  return (
    <AboutDiv bg={bg}>
      <div className="__banner_about">
        <p>Why are we best?</p>
        <div>
          <span>
            With our more than a decade of experience and the highest number of
            fleets. Get yourself a best quality vehicle at a best rate quoted
            anytime. We offer you flexible pricing according to your needs for
            the rental period. Whether it be daily, weekly, monthly or yearly we
            guarantee the best quality and price for your vehicle. In this time
            of era, safety is altogether about the fusion of technology and
            operations. Our highly technological marketplace ensures the safety
            and security of the customer 24/7 anytime anywhere.
          </span>
        </div>
      </div>
      <div className="__teams">
        <p>Our Teams</p>
        <div className="__teams_member">
          {members?.map((m) => (
            <div>
              <div className="__card">
                <img src={m.src} alt="" />
                <p>{m.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </AboutDiv>
  );
};

export default About;
