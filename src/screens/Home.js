import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodCat(response[1]);
    setFoodItems(response[0]);
    // console.log(response[0][0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="bg-dark d-flex flex-column flex-lg-row flex-md-row flex-sm-column justify-content-around py-3">
            <form class="d-flex my-1 col-lg-4 col-md-6 mx-3">
              <input
                class="form-control mr-sm-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button
                class="btn btn-outline-success my-2 my-sm-0 m-1 text-white bg-success "
                type="submit"
              >
                Search
              </button> */}
            </form>
          </div>
      </div>
      <div className="container">
        {foodCat.map((catData) => {
          {
            if (foodCat.length === 0) {
              return <h1>There is no data</h1>;
            }
            return (
              <div className="row mb-3">
                <div className="fs-3 m-3"> {catData.CategoryName} </div>
                <br />
                <hr />

                {foodItems
                  .filter((item) => (item.CategoryName === catData.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((data) => {
                    return (
                      <div className="col-12 col-md-6 col-lg-3">
                        <Card data={data} />
                      </div>
                    );
                  })}
              </div>
            );
          }
        })}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
