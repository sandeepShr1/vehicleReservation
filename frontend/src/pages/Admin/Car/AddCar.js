import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createCar, clearError } from "../../../redux/actions/carActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NEW_CAR_RESET } from "../../../redux/constants/carConstants";
import styled from "styled-components";
import Loading from "../../../components/Loading/index";

const CarForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .__form_container {
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    h1 {
      font-weight: 500;
      font-size: 2.8rem;
      color: #ed143d;
    }
    .__form {
      display: grid;
      grid-template-areas: "left right";
      gap: 2rem;
      padding: 2rem 0;
      div {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        div {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          span {
            font-weight: 300;
            font-size: 1.2rem;
            color: #000000;
          }
          input,
          textarea {
            width: 280px;
            height: 65px;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            padding-left: 2rem;
          }
        }
        .__img_input > input::file-selector-button {
          cursor: pointer;
          width: 100%;
          z-index: 22;
          height: 100%;
          border: none;
          font-size: 1rem;
          /* margin: 3%; */
          font: 400 0.8vmax;
          transition: all 0.5s;
          padding: 0 1vmax;
          color: rgba(0, 0, 0, 0.623);
          background-color: rgb(255, 255, 255);
        }

        .__img_input > input::file-selector-button:hover {
          background-color: rgb(235, 235, 235);
        }
      }
      .createCarFormImage {
        img {
          width: 50px;
        }
      }
    }
    button {
      background: #ed143d;
      border-radius: 9px;
      width: 10rem;
      height: 4rem;
      color: #fff;
      font-weight: 600;
      font-size: 1.6rem;
      border: none;
    }
  }
`;

const AddCar = ({ createCar, loading, clearError, success, error }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const createCarSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("model", model);
    myForm.set("year", year);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    createCar(myForm);
  };

  const createCarImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (error) {
      // alert.error(error);
      clearError();
    }

    if (success) {
      // alert.success("Car Created Successfully");
      history("/admin/cars");
      dispatch({ type: NEW_CAR_RESET });
    }
  }, [dispatch, error, history, success]);

  if (loading) {
    return <Loading />;
  }
  return (
    <CarForm>
      {/* <MetaData title="Create Car" /> */}
      <div className="__form_container">
        <h1>Let us know the details...</h1>
        <form
          className="__form"
          encType="multipart/form-data"
          onSubmit={createCarSubmitHandler}
        >
          <div>
            <div>
              <span>Name of Vehicle</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <span>Rate per day</span>
              <input
                type="number"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <span>Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
          </div>

          <div>
            <div>
              <span>Model Number</span>
              <input
                type="text"
                required
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            <div>
              <span>Year</span>
              <input
                type="number"
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="__img_input">
              <span>Add Photo</span>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createCarImagesChange}
                multiple
              />
            </div>

            <div className="createCarFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Car Preview" />
              ))}
            </div>
          </div>

          <button
            id="createCarBtn"
            type="submit"
            // disabled={loading ? true : false}
          >
            Create
          </button>
        </form>
      </div>
    </CarForm>
  );
};

const mapStateToProps = ({ newCarState: { loading, success, error } }) => ({
  loading,
  success,
  error,
});

const mapDispatchToProps = {
  createCar,
  clearError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddCar);
