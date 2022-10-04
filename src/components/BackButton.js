import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <div className="ReturnButton">
      <Link
        onClick={() => navigate(-1)}
        className="btn btn-warn-back"
        to="/coins"
      >
        <FaArrowCircleLeft />
      </Link>
    </div>
  );
};

export default ReturnButton;
