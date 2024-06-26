// TeamDisplayList.js

// React와 필요한 React Bootstrap 컴포넌트를 가져옵니다.
import React from 'react';
import { Table } from 'react-bootstrap';

// TeamDisplayList 컴포넌트: 팀 멤버 목록을 표시합니다.
// props로 members 배열을 받습니다.
const TeamDisplayList = ({ members }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>이름</th>
          <th>포지션</th>
          <th>실력</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => (
          <tr key={index}>
            <td>{member.name}</td>
            <td>{member.position}</td>
            <td>{member.skill}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamDisplayList;