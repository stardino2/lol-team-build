// TeamForm.js

// React와 Formik 라이브러리에서 필요한 기능들을 가져옵니다.
import React from "react";
import { Formik, Field, Form } from "formik";

// React Bootstrap 컴포넌트들을 가져옵니다.
import { Button, Container, Row, Col } from "react-bootstrap";

// TeamForm 컴포넌트: 새로운 팀 멤버를 추가하기 위한 폼을 제공합니다.
// props로 addMember 함수와 positions 배열을 받습니다.
const TeamForm = ({ addMember, positions }) => (
  // Formik을 사용하여 폼 상태와 제출을 관리합니다.
  <Formik
    // 폼의 초기 값을 설정합니다.
    initialValues={{ name: "", position: positions[0], skill: 1 }}
    // 폼 제출 시 실행될 함수를 정의합니다.
    onSubmit={(values, { resetForm }) => {
      addMember(values); // 새 멤버를 추가합니다.
      resetForm(); // 폼을 초기화합니다.
    }}
  >
    {() => (
      <Form>
        <Container>
          <Row>
            <Col>
              {/* 이름 입력 필드 */}
              <Field name="name" placeholder="이름" className="form-control" />
            </Col>
            <Col>
              {/* 포지션 선택 드롭다운 */}
              <Field as="select" name="position" className="form-control">
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </Field>
            </Col>
            <Col>
              {/* 실력 선택 드롭다운 */}
              <Field as="select" name="skill" className="form-control">
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Field>
            </Col>
            <Col>
              {/* 제출 버튼 */}
              <Button type="submit">추가</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    )}
  </Formik>
);

export default TeamForm;
