import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  // 처음 로딩하면 상품리스트 불러오기
  const productList = useSelector((state) => state.product.productList);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  useEffect(() => {
    dispatch(
      productActions.getProductList({
        name,
      })
    );
  }, [query]);
  
  useEffect(()=>{
    dispatch(productActions.getProductList())
  }, [])

  return (
      <Container>
      <Row>
        {productList.length > 0 ? (productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>there are no register products</h2>
            ) : (
              <h2>not found {name}`</h2>
            )}
          </div>
        )}
      </Row>
      </Container>
  );
};

export default ProductAll;