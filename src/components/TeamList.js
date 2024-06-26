// TeamList.js

import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

const TeamList = ({ members, updateMember }) => {
  const [editingMember, setEditingMember] = useState(null);

  const handleEdit = (member) => {
    setEditingMember({ ...member });
  };

  const handleSave = () => {
    updateMember(members.findIndex(m => m.name === editingMember.name), editingMember);
    setEditingMember(null);
  };

  const handleChange = (e, member) => {
    const { name, value } = e.target;
    if (editingMember && editingMember.name === member.name) {
      setEditingMember({ ...editingMember, [name]: name === 'skill' ? parseInt(value) : value });
    } else {
      const updatedMember = { ...member, [name]: name === 'skill' ? parseInt(value) : value };
      updateMember(members.indexOf(member), updatedMember);
    }
  };

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
            <td>
              <Form.Control
                type="text"
                name="name"
                value={editingMember && editingMember.name === member.name ? editingMember.name : member.name}
                onChange={(e) => handleChange(e, member)}
                onFocus={() => handleEdit(member)}
                onBlur={handleSave}
              />
            </td>
            <td>
              <Form.Control
                as="select"
                name="position"
                value={editingMember && editingMember.name === member.name ? editingMember.position : member.position}
                onChange={(e) => handleChange(e, member)}
                onFocus={() => handleEdit(member)}
                onBlur={handleSave}
              >
                {['탑', '정글', '미드', '원딜', '서폿'].map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </Form.Control>
            </td>
            <td>
              <Form.Control
                as="select"
                name="skill"
                value={editingMember && editingMember.name === member.name ? editingMember.skill : member.skill}
                onChange={(e) => handleChange(e, member)}
                onFocus={() => handleEdit(member)}
                onBlur={handleSave}
              >
                {[1, 2, 3].map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </Form.Control>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamList;