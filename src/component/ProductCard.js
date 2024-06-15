import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const ProductCard = ({ item, favorite }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };

  const noStock = () => {
    return Object.values(item.stock).every((value) => value === 0);
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
      {noStock() && <div className="productCard-noStockSign">품절</div>}
      <div className="productCard-favoriteStar">
        {favorite ? (
          <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
        ) : (
          <FontAwesomeIcon icon={faStar} style={{ color: "white" }} />
        )}
      </div>

      <div className="card-show">
        <div>{item?.name}</div>
        <div>₩ {currencyFormat(item?.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
