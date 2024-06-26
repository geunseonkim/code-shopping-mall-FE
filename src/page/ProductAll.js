import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import Modal from "../component/Modal";
import { favoriteAction } from "../action/favoriteAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  // 처음 로딩하면 상품리스트 불러오기
  const productList = useSelector((state) => state.product.productList);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  const [showModal, setShowModal] = useState(false);
  const [noStock, setNoStock] = useState(false);
  const [underPrice, setUnderPrice] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite) || [];

  useEffect(() => {
    dispatch(favoriteAction.getFavorite());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
  }, [query]);

  const filterNoStockAndUnderPrice = productList.filter((item) => {
    if (noStock) {
      const stockValue = Object.values(item.stock);
      if (!stockValue.some((value) => value > 0 && item.status === "active")) {
        return false;
      }
    }
    if (underPrice) {
      if (!(item.price <= 10000 && item.status === "active")) {
        return false;
      }
    }
    return true;
  });

  return (
    <Container>
      <div
        className="filterCheckBox"
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          fontWeight: "600",
          color: "white",
          // display: "flex",
          // justifyContent: "flex-end",
        }}
      >
        <label for="CheckBoxNoStock" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            id="CheckBoxNoStock"
            checked={noStock}
            onChange={() => setNoStock((prev) => !prev)}
          />{" "}
          품절 상품 제외하기
        </label>

        <label for="checkUnderPrice">
          <input
            type="checkbox"
            id="checkUnderPrice"
            checked={underPrice}
            onChange={() => setUnderPrice((prev) => !prev)}
          />{" "}
          초특가 10,000원 상품 만나보기
        </label>
      </div>
      <Row>
        {filterNoStockAndUnderPrice.length > 0 ? (
          filterNoStockAndUnderPrice.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard
                item={item}
                favorite={favorite?.some(
                  (favorite) => favorite._id === item._id
                )}
              />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>there are no register products</h2>
            ) : (
              <h2>not found {name}</h2>
            )}
          </div>
        )}
      </Row>

      <button onClick={() => setShowModal(true)} className="modal-button-fixed">
        <img
          className="fixed-modal-img"
          style={{ width: "60px" }}
          src="https://png.pngtree.com/png-vector/20240131/ourlarge/pngtree-palm-tree-clipart-png-image_11522556.png"
        />
      </button>

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h2>신상품 출고 소식</h2>
        <img
          style={{ width: "450px", marginBottom: "10px" }}
          src="https://www.royalhawaiianmovers.com/wp-content/uploads/2011/04/palm-trees-bay-sunset-blog.jpg"
        />
        <h4>🏖️✨6월 신상품 업로드!!👙🌅 </h4>
        <p>
          저희 코디바디 수영복과 함께 황홀한 여름을 즐겨보세요. 안목 좋은
          사장님이 하와이에서 직접 스타일리쉬한 수영복을 제작합니다.
        </p>
      </Modal>
    </Container>
  );
};

export default ProductAll;
