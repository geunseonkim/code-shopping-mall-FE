import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { userActions } from "../action/userAction";
import "../style/register.style.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const error = useSelector((state) => state.user.error);

useEffect(() => {
  dispatch(userActions.clearError())
}, [dispatch]);

// useEffect(() => {
//   return () => {
//     dispatch(userActions.clearError()); // 컴포넌트 언마운트 시 오류 초기화
//   };
// }, [dispatch]);

  const register = async(event) => {
    event.preventDefault();
    // 비번 중복확인 일치하는지 확인
    // 이용약관에 체크했는지 확인
    // FormData에 있는 값을 가지고 백엔드로 넘겨주기
    // 성공후 로그인 페이지로 넘어가기
    // 이미 가입한 유저가 있다면 그 에러 메세지를 보여주기

    const {name, email, password, confirmPassword, policy} = formData
      if (password !== confirmPassword) {
        return setPasswordError("비밀번호가 일치하지 않습니다.")
      }
      if (!formData.policy) {
        return setPolicyError(true)
      }
      setPasswordError("")
      setPolicyError(false)
      dispatch(userActions.registerUser({name, email, password}, navigate))
  };

  const handleChange = (event) => {
    event.preventDefault();
    // 값을 읽어서 FormData에 넣어주기

    const {id, value, checked} = event.target
    // console.log(id, value, checked)
    if (id === "policy") {
      setFormData(formData => ({...formData, [id]: checked}))
    } else {
      setFormData(formData => ({...formData, [id]: value}))
    }
      // const isChecked = event.target.checked;
      // console.log("Checkbox is checked:", isChecked);

  };

  return (
    <Container className="register-area">
      {error && (
        <div>
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )}
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            isInvalid={passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="이용약관에 동의합니다"
            id="policy"
            onChange={handleChange}
            isInvalid={policyError}
            checked={formData.policy}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
