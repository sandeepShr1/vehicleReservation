import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { createCar, clearError } from "../../../redux/actions/carActions"
import { useNavigate } from 'react-router-dom';
import "./AddCar.css"
import { useDispatch } from 'react-redux';
import { NEW_CAR_RESET } from "../../../redux/constants/carConstants"


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

      return (
            <>
                  {/* {loading ? <Loader /> : ( */}
                  <>
                        {/* <MetaData title="Create Car" /> */}
                        <div className="__form_container">
                              <form
                                    className="__form"
                                    encType="multipart/form-data"
                                    onSubmit={createCarSubmitHandler}
                              >
                                    <h1>Create Car</h1>

                                    <div>
                                          <input
                                                type="text"
                                                placeholder="Car Name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                          />
                                    </div>
                                    <div>
                                          <input
                                                type="number"
                                                placeholder="Price"
                                                required
                                                onChange={(e) => setPrice(e.target.value)}
                                          />
                                    </div>

                                    <div>

                                          <textarea
                                                placeholder="Car Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                cols="30"
                                                rows="1"
                                          ></textarea>
                                    </div>

                                    <div>
                                          <input
                                                type="text"
                                                placeholder="model"
                                                required
                                                onChange={(e) => setModel(e.target.value)}
                                          />

                                    </div>

                                    <div>
                                          <input
                                                type="number"
                                                placeholder="year"
                                                required
                                                onChange={(e) => setYear(e.target.value)}
                                          />
                                    </div>

                                    <div id="createCarFormFile">
                                          <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={createCarImagesChange}
                                                multiple
                                          />
                                    </div>

                                    <div id="createCarFormImage">
                                          {imagesPreview.map((image, index) => (
                                                <img key={index} src={image} alt="Car Preview" />
                                          ))}
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
                  </>
                  {/* )} */}
            </>
      )
}

const mapStateToProps = ({
      newCarState: { loading, success, error }

}) => ({
      loading, success, error
});

const mapDispatchToProps = {
      createCar,
      clearError
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddCar);
