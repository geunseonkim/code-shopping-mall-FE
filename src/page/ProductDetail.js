import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  NavItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";
import { favoriteAction } from "../action/favoriteAction";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const productDetail = useSelector((state) => state.product.productDetail);
  const { user } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);

  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    if (size === "") {
      setSizeError(true);
      return;
    }
    // 아직 로그인을 안한유저라면 로그인페이지로
    if (!user) {
      navigate("/login");
    }
    // 카트에 아이템 추가하기
    dispatch(cartActions.addToCart({ id, size, qty: 1 }));
    // navigate("/cart");
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
    if (sizeError) {
      setSizeError(false);
    }
    setSize(value);
  };

  //카트에러가 있으면 에러메세지 보여주기

  //에러가 있으면 에러메세지 보여주기

  useEffect(() => {
    // 상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(id));
  }, [id, dispatch]);

  const addFavorite = () => {
    dispatch(favoriteAction.addFavorite(id));
  };

  const deleteFavorite = () => {
    dispatch(favoriteAction.deleteFavorite(id));
  };

  if (productDetail)
    return (
      <Container className="product-detail-card">
        <Row style={{ marginBottom: "50px" }}>
          <Col sm={6}>
            <img
              src={productDetail?.image}
              className="w-100"
              alt="image"
              style={{ border: "7px solid white" }}
            />
          </Col>
          <Col className="product-info-area" sm={6}>
            <div className="product-info product-detail-name">
              {productDetail?.name || "리넨셔츠"}
            </div>
            <div
              className="product-info"
              style={{ fontSize: "24px", fontWeight: "600", color: "white" }}
            >
              {productDetail
                ? `₩ ${currencyFormat(productDetail.price)}`
                : "₩ 45,000"}
            </div>
            <div
              style={{ border: "1px solid white", marginBottom: "10px" }}
            ></div>
            <div className="product-info">
              {productDetail?.description || "샘플설명"}
            </div>

            {!Object.values(productDetail.stock).every(
              (value) => value === 0
            ) && (
              <Dropdown
                className="drop-down size-drop-down"
                title={size}
                align="start"
                onSelect={(value) => selectSize(value)}
              >
                <Dropdown.Toggle
                  className="size-drop-down"
                  variant={sizeError ? "outline-danger" : "outline-dark"}
                  id="dropdown-basic"
                  align="start"
                >
                  {size === "" ? "사이즈 선택" : size.toUpperCase()}
                </Dropdown.Toggle>

                {/* <Dropdown.Menu className="size-drop-down">
              <Dropdown.Item>M</Dropdown.Item>
            </Dropdown.Menu> */}

                <Dropdown.Menu className="size-drop-down">
                  {productDetail && productDetail.stock ? (
                    Object.entries(productDetail.stock)
                      .filter(([size, qty]) => qty > 0)
                      .map(([size, qty]) => (
                        <Dropdown.Item key={size} eventKey={size}>
                          {`${size.toUpperCase()}: ${qty} left`}
                        </Dropdown.Item>
                      ))
                  ) : (
                    <Dropdown.Item disabled>
                      there are no stock info.
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div className="warning-message">
              {sizeError && "사이즈를 선택해주세요."}
            </div>
            {Object.values(productDetail.stock).every(
              (value) => value === 0
            ) ? (
              <Button variant="dark" className="add-button" disabled="true">
                품절
              </Button>
            ) : (
              <Button
                variant="dark"
                className="add-button"
                onClick={addItemToCart}
              >
                추가
              </Button>
            )}

            {favorite?.some(
              (favorite) => favorite._id === productDetail._id
            ) ? (
              <Button
                variant="warning"
                className="add-button"
                onClick={deleteFavorite}
              >
                찜 취소하기
              </Button>
            ) : (
              <Button
                variant="primary"
                className="add-button"
                onClick={addFavorite}
              >
                찜하기
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    );
};

export default ProductDetail;
