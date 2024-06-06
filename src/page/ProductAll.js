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
  const {productList} = useSelector(state=>state.product)


  // useEffect(()=>{
  //   dispatch(productActions.getProductList())
  // }, [])

  useEffect(() => {
    dispatch(productActions.getAllProducts());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {/* <Col md={3} sm={12}> */}
          <ProductCard data={productList}/>
        {/* </Col> */}
      </Row>
    </Container>
  );
};

export default ProductAll;
