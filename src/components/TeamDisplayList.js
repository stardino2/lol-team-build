// TeamDisplayList.js
import React from 'react';
import { Table } from 'react-bootstrap';

const TeamDisplayList = ({ members }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th style={{ width: '40%' }}>이름</th>
          <th style={{ width: '30%' }}>포지션</th>
          <th style={{ width: '30%' }}>실력</th>
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