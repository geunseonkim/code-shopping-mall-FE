import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import { Col } from "react-bootstrap";
import { FontWeight } from "@cloudinary/url-gen/qualifiers";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };

  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <img
        style={{
          width: "300px",
          height: "450px",
          border: "7px solid white",
        }}
        src={item?.image}
        alt={item?.image}
      />
      <div className="card-show">
        <div>{item?.name}</div>
        <div>₩ {currencyFormat(item?.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
