import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createCar,
  clearError,
  updateCar,
  getCarDetails,
} from "../../../redux/actions/carActions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  NEW_CAR_RESET,
  UPDATE_CAR_RESET,
} from "../../../redux/constants/carConstants";
import styled from "styled-components";
import Loading from "../../../components/Loading/index";
import { toast } from "react-hot-toast";

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
          select,
          input,
          textarea {
            width: 280px;
            height: 65px;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            padding-left: 2rem;
            padding-top: 1rem;
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
      cursor: pointer;
    }
  }
`;

const AddCar = ({
  createCar,
  loading,
  clearError,
  success,
  error,
  updateCar,
  updateError,
  isUpdated,
  getCarDetails,
  productError,
  car,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [oldImages, setOldImages] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);
  const vehicleTypes = [
    "sedan",
    "hatchback",
    "suv (7 seater)",
    "electric",
    "suv(5 seater)",
  ];

  const createCarSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("numberPlate", numberPlate);

    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("vehicleType", vehicleType);
    myForm.set("model", model);

    myForm.set("year", year);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    if (id) {
      updateCar(id, myForm);
    } else {
      createCar(myForm);
    }
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
      toast.error(error);
      clearError();
    }
    if (productError) {
      toast.error(error);
      clearError();
    }

    if (success) {
      toast.success("Car Created Successfully");
      history("/admin/cars");
      dispatch({ type: NEW_CAR_RESET });
    }
    if (id) {
      getCarDetails(id);
    }
    if (updateError) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("Car Updated Successfully");
      history("/admin/cars");
      dispatch({ type: UPDATE_CAR_RESET });
    }
  }, [
    dispatch,
    error,
    history,
    success,
    id,
    isUpdated,
    productError,
    updateError,
  ]);
  useEffect(() => {
    if (car?._id) {
      setName(car?.name);
      setNumberPlate(car?.numberPlate);
      setPrice(car?.price);
      setDescription(car?.description);
      setModel(car?.model);
      setYear(car?.year);
      setOldImages(car?.images);
      setVehicleType(car?.vehicleType);
    }
  }, [car]);

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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <span>Vehicle Type</span>

              <select onChange={(e) => setVehicleType(e.target.value)}>
                <option value="">Choose Vehicle Type</option>
                {vehicleTypes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
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
                value={model}
                required
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div>
              <span>Number Plate</span>
              <input
                type="text"
                required
                value={numberPlate}
                onChange={(e) => setNumberPlate(e.target.value)}
              />
            </div>

            <div>
              <span>Year</span>
              <input
                type="number"
                value={year}
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
              {oldImages &&
                oldImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="product preview"
                    loading="lazy"
                  />
                ))}
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
            Save
          </button>
        </form>
      </div>
    </CarForm>
  );
};

const mapStateToProps = ({
  newCarState: { loading, success, error },
  car: { error: updateError, isUpdated },
  carDetails: { error: productError, car },
}) => ({
  loading,
  success,
  error,
  updateError,
  isUpdated,
  productError,
  car,
});

const mapDispatchToProps = {
  createCar,
  clearError,
  updateCar,
  getCarDetails,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddCar);
