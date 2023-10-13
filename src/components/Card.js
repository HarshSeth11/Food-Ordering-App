import React from "react";

export default function Card(props) {
  let options = props.data.options[0];
  let priceOptions = Object.keys(options)

  return (
      <div>
        <div className="card mt-3" style={{ width: "18rem" }}>
          <img src={props.data.img} className="card-img-top rounded mx-auto d-block " alt="..." height="250px" style={{'objectFit':'cover'}}  />
          <div className="card-body">
            <h5 className="card-title">{props.data.name}</h5>
            <p className="card-text">{props.data.description}</p>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded">
                {
                priceOptions.map((option) => {
                  return(
                    <option value={option}>{option}</option>
                  )
                })
                }
              </select>
              <div className="d-inline h-100 fs-6">Total Price:</div>
            </div>
          </div>
        </div>
      </div>
  );
}
