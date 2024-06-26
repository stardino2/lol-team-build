import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button, Container, Row, Col } from 'react-bootstrap';

const positions = ['탑', '정글', '미드', '원딜', '서폿'];

const TeamForm = ({ addMember }) => (
  <Formik
    initialValues={{ name: '', position: positions[0], skill: 1 }}
    onSubmit={(values, { resetForm }) => {
      addMember(values);
      resetForm();
    }}
  >
    {() => (
      <Form>
        <Container>
          <Row>
            <Col>
              <Field name="name" placeholder="이름" className="form-control" />
            </Col>
            <Col>
              <Field as="select" name="position" className="form-control">
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </Field>
            </Col>
            <Col>
              <Field as="select" name="skill" className="form-control">
                {[1, 2, 3].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Field>
            </Col>
            <Col>
              <Button type="submit">추가</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    )}
  </Formik>
);

export default TeamForm;