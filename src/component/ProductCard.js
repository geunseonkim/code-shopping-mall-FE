import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import { Col} from "react-bootstrap";


const ProductCard = ({data}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
  };

  console.log("ddd", data)
  
  return (
    data.map((item, idx)=>(
      <Col md={3} sm={12}>
      <div className="card" key={idx} onClick={() => showProduct("hard_code")}>
      <img
        src={item.image}
        alt=""
      />
      <div>{item.name}</div>
      <div>₩ {item.price}</div>
    </div>
    </Col>
    ))
  );
};

export default ProductCard;
