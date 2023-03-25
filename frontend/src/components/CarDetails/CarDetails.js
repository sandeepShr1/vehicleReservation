import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, getCarDetails, newReview } from "../../redux/actions/carActions";
import Loading from "../Loading/index";
import styled from "styled-components";
import DateRangeComp from "../DateRange/DateRangeComp";
import StarBorderIcon from "@mui/icons-material/StarBorder"

import { Rating } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ReviewCard from "../ReviewRating";
import { NEW_REVIEWS_RESET } from "../../redux/constants/carConstants";
import { toast } from "react-hot-toast";

const CarDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0;
  .__t1 {
    font-weight: 600;
    font-size: 5.4rem;
    color: #000000;
  }
  .__t2 {
    font-weight: 400;
    font-size: 2.8rem;
    color: #ed143d;
  }
  .__car_details {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    .__car_image {
      width: 60rem;
      img {
        width: 100%;
        border-radius: 8px;
        object-fit: cover;
      }
    }
    .__details {
      background: rgba(208, 208, 208, 0.49);
      border-radius: 1rem;
      display: flex;
      justify-content: space-around;
      ul {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem 0;
        .__reviews {
          color: #f02d34;
          margin-top: 10px;
          display: flex;
          gap: 5px;
          align-items: center;
        }
        :first-child {
          li {
            list-style: none;
            font-weight: 400;
            font-size: 2.4rem;
            color: #ed143d;
          }
        }
        :last-child {
          li {
            list-style: none;
            font-weight: 400;
            font-size: 2.4rem;
            color: #1e1e1e;
            text-transform: capitalize;
          }
        }
      }
    }
  }
  .__book {
    .__btns{
      display: flex;
      gap: 2rem;

      .__book_btn {
        margin: 2rem 0;
        padding: 1.6rem 2rem;
        border: none;
        background: #ed143d;
        border-radius: 9px;
        color: #ffffff;
        font-size: 1.6rem;
        cursor: pointer;
        :hover {
          background: #c03952;
        }
      }
    }
    
  }

  .__submitReview {
    display: flex ;
    flex-direction: column;
    background-color: #f02d34;

    .submitDialogTextArea {
    border: 1px solid rgba(0, 0, 0, 0.082);
    margin: 1vmax 0;
    outline: none;
    padding: 1rem;
    font: 300 1rem;
  }
  }

  

  .reviewsHeading {
    color: #000000be;
    font: 500 1.4vmax;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.226);
    padding: 1vmax;
    width: 20vmax;
    margin: auto;
    margin-bottom: 4vmax;
  }

  .reviews {
    display: flex;
    overflow: auto;
  }

  .reviewCard {
    flex: none;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.226);
    /* border: 1px solid rgba(56, 56, 56, 0.116); */
    width: 10vmax;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1vmax;
    padding: 3vmax;
  }

  .reviewCard > img {
    width: 5vmax;
  }

  .reviewCard > p {
    color: rgba(0, 0, 0, 0.836);
    font: 600 0.9vmax;
  }

  .reviewCardComment {
    color: rgba(0, 0, 0, 0.445);
    font: 300 0.8vmax;
  }

  .noReviews {
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: rgba(0, 0, 0, 0.548);
  }
`;

const CarDetails = ({ getCarDetails, car, loading, error, newReview, success,
  reviewError }) => {
  const [rangeDates, setRangeDates] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleBooking = () => {
    const items = { car: car, rangeDates: rangeDates };
    localStorage.setItem("booking", JSON.stringify(items));
    history("../booking/new", { replace: true });
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const submitReviewHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("carId", id);

    newReview(myForm);
    setOpen(false);
  };
  const options = {
    size: "large",
    value: car?.ratings,
    readOnly: true,
    precision: 0.5,
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEWS_RESET });
    }
    getCarDetails(id);


  }, [dispatch, toast, error, reviewError, success]);
  if (loading) {
    return <Loading />;
  }
  console.log(rangeDates);
  return (
    <CarDetail>
      <p className="__t1">Great Choice</p>
      <p className="__t2">Explore all over Nepal</p>
      <div className="__car_details">
        <div className="__car_image">
          <img src={car?.images?.[0]?.url} alt="" />
        </div>
        <div className="__details">
          <ul>
            <li>Vehicle Name</li>
            <li>Model</li>
            <li>Year</li>
            <li>Vehicle Type</li>
            <li>Number Plate</li>
            <li>Rate</li>
            <li>Rating</li>
          </ul>
          <ul>
            <li>{car?.name || "-"}</li>
            <li>{car?.model || "-"}</li>
            <li>{car?.year || "-"}</li>
            <li>{car?.vehicleType || "-"}</li>
            <li>{car?.numberPlate || "-"}</li>
            <li>Rs. {car?.price || "-"} per day</li>
            <li>
              <div className="__reviews">
                <div>
                  <Rating {...options} />
                </div>
                <p>({car?.numOfReviews})</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="__book">
          <DateRangeComp setRangeDates={setRangeDates} />

          <div className="__btns">
            <button className="__book_btn" onClick={handleBooking}>
              Book Now
            </button>
            <button
              onClick={submitReviewToggle}
              className="__book_btn"
              type='button'
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="__submitReview" style={{ display: "flex", flexDirection: "column" }}>
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={Number(rating)}
            size="large"
            name="size-large"
            sx={{ fontSize: 14, background: "red" }}
          />
          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <DialogActions>
            <Button color="secondary" onClick={submitReviewToggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={submitReviewHandler}>
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {car.reviews && car.reviews[0] ? (
        <div className="reviews">
          {car.reviews && car.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
        </div>
      ) : (
        <p className="noReviews">No reviews</p>
      )}
    </CarDetail>
  );
};
const mapStateToProps = ({ carDetails: { loading, car, error }, newReview: { success, error: reviewError } }) => ({
  loading,
  car,
  error,
  success,
  reviewError
});

const mapDispatchToProps = {
  getCarDetails,
  newReview,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CarDetails);
