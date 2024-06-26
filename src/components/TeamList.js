// TeamList.js

// React와 필요한 React Bootstrap 컴포넌트들을 가져옵니다.
import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

// TeamList 컴포넌트: 멤버 목록을 표시하고 편집할 수 있게 합니다.
// props로 members 배열, removeMember 함수, updateMember 함수를 받습니다.
const TeamList = ({ members, removeMember, updateMember }) => {
  // 현재 편집 중인 멤버의 상태를 관리합니다.
  const [editingMember, setEditingMember] = useState(null);

  // 멤버 편집을 시작하는 함수
  const handleEdit = (member) => {
    setEditingMember({ ...member });
  };

  // 멤버 편집을 저장하는 함수
  const handleSave = () => {
    updateMember(members.findIndex(m => m.name === editingMember.name), editingMember);
    setEditingMember(null);
  };

  // 멤버 정보 변경을 처리하는 함수
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
          <th>편집</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => (
          <tr key={index}>
            <td>
              {/* 이름 입력 필드 */}
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
              {/* 포지션 선택 드롭다운 */}
              <Form.Control
                as="select"
                name="position"
                value={editingMember && editingMember.name === member.name ? editingMember.position : member.position}
                onChange={(e) => handleChange(e, member)}
                onFocus={() => handleEdit(member)}
                onBlur={handleSave}
              >
                {['탑', '정글', '미드', '원딜', '서폿', '칼바람'].map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </Form.Control>
            </td>
            <td>
              {/* 실력 선택 드롭다운 */}
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
            <td>
              {/* 삭제 버튼 */}
              <Button variant="danger" onClick={() => removeMember(index)}>삭제</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamList;