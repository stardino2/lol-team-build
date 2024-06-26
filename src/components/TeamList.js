// TeamList.js

import React, { useState, useCallback } from "react";
import { Button, Table, Form } from "react-bootstrap";

const TeamList = ({ members, removeMember, updateMember }) => {
  // 각 멤버의 현재 입력 값을 저장하는 상태
  const [editingMembers, setEditingMembers] = useState({});

  // 멤버 편집을 시작할 때 호출되는 함수
  const handleEdit = useCallback((member) => {
    setEditingMembers((prev) => ({
      ...prev,
      [member.id]: { ...member },
    }));
  }, []);

  // 멤버 정보가 변경될 때 호출되는 함수
  const handleChange = useCallback((e, memberId) => {
    const { name, value } = e.target;
    setEditingMembers((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        [name]: name === "skill" ? parseInt(value) : value,
      },
    }));
  }, []);

  // 멤버 편집을 완료할 때 호출되는 함수
  const handleSave = useCallback(
    (memberId) => {
      const editedMember = editingMembers[memberId];
      if (editedMember) {
        updateMember(memberId, editedMember);
        setEditingMembers((prev) => {
          const newState = { ...prev };
          delete newState[memberId];
          return newState;
        });
      }
    },
    [editingMembers, updateMember]
  );

  // 멤버의 현재 값을 가져오는 함수
  const getMemberValue = useCallback(
    (member, field) => {
      return editingMembers[member.id]
        ? editingMembers[member.id][field]
        : member[field];
    },
    [editingMembers]
  );

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
        {members.map((member) => (
          <tr key={member.id}>
            <td>
              <Form.Control
                type="text"
                name="name"
                value={getMemberValue(member, "name")}
                onChange={(e) => handleChange(e, member.id)}
                onFocus={() => handleEdit(member)}
                onBlur={() => handleSave(member.id)}
              />
            </td>
            <td>
              <Form.Control
                as="select"
                name="position"
                value={getMemberValue(member, "position")}
                onChange={(e) => handleChange(e, member.id)}
                onFocus={() => handleEdit(member)}
                onBlur={() => handleSave(member.id)}
              >
                {["탑", "정글", "미드", "원딜", "서폿"].map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td>
              <Form.Control
                as="select"
                name="skill"
                value={getMemberValue(member, "skill")}
                onChange={(e) => handleChange(e, member.id)}
                onFocus={() => handleEdit(member)}
                onBlur={() => handleSave(member.id)}
              >
                {[1, 2, 3].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td>
              <Button variant="danger" onClick={() => removeMember(member.id)}>
                삭제
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamList;
