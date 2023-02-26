import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CarCard from "../../components/carCard/CarCard";
import { clearError, getCar } from "../../redux/actions/carActions";
import styled from "styled-components";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/index";
import Pagination from "react-js-pagination";
import { FaSearch } from "react-icons/fa";
import ReactSlider from "react-slider";

const CarsDiv = styled.div`
  > p {
    margin: 3rem 0;
    text-align: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 5rem;
    color: #ed143d;
  }
  .__filters {
    margin: 4rem 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .search-container {
      .search {
        position: relative;
        .searchTerm {
          width: 100%;
          height: 6rem;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding-left: 1rem;
        }
        .searchButton {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          right: 0;
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
      }
    }

    .horizontal-slider {
      width: 100%;
      max-width: 300px;
      height: 30px;
    }
    .example-thumb {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ed143d;
      color: white;
      cursor: pointer;
      border-radius: 50%;
      box-sizing: border-box;
    }
    .example-track {
      position: relative;
      background: #ed143d;
    }

    .example-track.example-track-1 {
      background: #ddd;
    }

    .horizontal-slider .example-track {
      top: 20px;
      height: 5px;
    }

    .horizontal-slider .example-thumb {
      top: 7px;
      width: 35px;
      height: 35px;
      line-height: 38px;
      border: none;
    }
  }
  .paginationBox {
    display: flex;
    justify-content: center;
    margin: 6vmax;
    .pagination {
      display: flex;
      justify-content: center;
      padding: 0;
    }

    .page-item {
      background-color: rgb(255, 255, 255);
      list-style: none;
      /* border: 1px solid rgba(0, 0, 0, 0.178); */
      padding: 1vmax 1.5vmax;
      transition: all 0.3s;
      cursor: pointer;
    }

    .page-item:first-child {
      border-radius: 5px 0 0 5px;
    }

    .page-item:last-child {
      border-radius: 0 5px 5px 0;
    }

    .page-link {
      text-decoration: none;
      font: 300 0.7vmax;
      color: rgb(80, 80, 80);
      transition: all 0.3s;
    }

    .page-item:hover {
      background-color: rgb(230, 230, 230);
    }

    .page-item:hover .page-link {
      color: rgb(0, 0, 0);
    }

    .pageItemActive {
      color: #ed143d;
    }

    .pageLinkActive {
      color: #ed143d;
    }
  }

  .__feature_cars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    margin: 1rem 0;
    width: 100%;
  }
`;

const Cars = ({
  getCar,
  loading,
  cars,
  error,
  isError,
  carsCount,
  resultPerPage,
  filteredCarsCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [price, setPrice] = useState([0, 10000]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    getCar(keyword, currentPage);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }

    getCar(keyword, currentPage, price);
  }, [error, toast, currentPage, price]);
  if (loading) {
    <Loading />;
  }
  let count = filteredCarsCount;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  return (
    <CarsDiv>
      <p>Get a ride from here</p>

      <div className="__filters">
        <div className="search-container">
          <form className="search" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              className="searchTerm"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="searchButton">
              <FaSearch size={20} fill="#ed143d" />
            </button>
          </form>
        </div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          min={0}
          max={10000}
          onChange={(e) => setPrice([e, 10000])}
          renderThumb={(props, state) => {
            return <div {...props}>{state.valueNow}</div>;
          }}
        />
      </div>
      <div className="__feature_cars" id="cars">
        {cars ? (
          cars?.map((car) => <CarCard car={car} key={car._id} />)
        ) : (
          <Loading />
        )}
      </div>
      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={carsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </CarsDiv>
  );
};

const mapStateToProps = ({
  carsState: {
    loading,
    cars,
    error,
    carsCount,
    resultPerPage,
    filteredCarsCount,
    isError,
  },
}) => ({
  loading,
  cars,
  error,
  isError,
  carsCount,
  resultPerPage,
  filteredCarsCount,
});

const mapDispatchToProps = {
  getCar,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Cars);
