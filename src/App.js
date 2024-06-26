// App.js

import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import TeamForm from './components/TeamForm';
import TeamList from './components/TeamList';
import { distributeTeams } from './utils/teamUtils';

const App = () => {
  const [members, setMembers] = useState([]);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('탑');
  const [isFourPlayerMode, setIsFourPlayerMode] = useState(false);
  const [team1SkillTotal, setTeam1SkillTotal] = useState(0);
  const [team2SkillTotal, setTeam2SkillTotal] = useState(0);

  // 수정 시작: requiredPositions를 상수로 선언
  const requiredPositions = ['탑', '정글', '미드', '원딜', '서폿'];
  // 수정 끝

  useEffect(() => {
    const initialMembers = [
      { name: '1', position: '탑', skill: 1 },
      { name: '2', position: '탑', skill: 1 },
      { name: '3', position: '정글', skill: 1 },
      { name: '4', position: '정글', skill: 1 },
      { name: '5', position: '미드', skill: 1 },
      { name: '6', position: '미드', skill: 1 },
      { name: '7', position: '원딜', skill: 1 },
      { name: '8', position: '원딜', skill: 1 },
      { name: '9', position: '서폿', skill: 1 },
      { name: '10', position: '서폿', skill: 1 },
    ];
    setMembers(initialMembers);
  }, []);

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  // 수정 시작: updateMember 함수 업데이트
  const updateMember = (index, updatedMember) => {
    const newMembers = [...members];
    newMembers[index] = updatedMember;
    setMembers(newMembers);
  };
  // 수정 끝

  // App.js

const splitTeams = () => {
  const requiredTeamSize = isFourPlayerMode ? 4 : 5;
  const currentRequiredPositions = isFourPlayerMode
    ? requiredPositions.filter(pos => pos !== '서폿')
    : requiredPositions;

  if (members.length < requiredTeamSize * 2) {
    alert(`각 팀에 ${requiredTeamSize}명씩 포함되어야 합니다.`);
    return;
  }

  const positionGroups = members.reduce((groups, member) => {
    if (!groups[member.position]) {
      groups[member.position] = [];
    }
    groups[member.position].push(member);
    return groups;
  }, {});

  if (Object.keys(positionGroups).length !== currentRequiredPositions.length) {
    alert(`각 포지션(${currentRequiredPositions.join(', ')})에 적어도 한 명씩 있어야 합니다.`);
    return;
  }

  for (const position of currentRequiredPositions) {
    if (!positionGroups[position] || positionGroups[position].length < 2) {
      alert(`각 포지션에 적어도 두 명씩 있어야 합니다.`);
      return;
    }
  }

  const { newTeam1, newTeam2 } = distributeTeams(currentRequiredPositions, positionGroups);
  
  if (newTeam1.length === requiredTeamSize && newTeam2.length === requiredTeamSize) {
    setTeam1(newTeam1);
    setTeam2(newTeam2);
    setTeam1SkillTotal(calculateSkillTotal(newTeam1));
    setTeam2SkillTotal(calculateSkillTotal(newTeam2));
  } else {
    alert('팀을 나누는 데 문제가 발생했습니다. 멤버 구성을 확인해주세요.');
  }
};

  const swapPlayers = (position) => {
    const team1PlayerIndex = team1.findIndex((member) => member.position === position);
    const team2PlayerIndex = team2.findIndex((member) => member.position === position);

    if (team1PlayerIndex >= 0 && team2PlayerIndex >= 0) {
      const newTeam1 = [...team1];
      const newTeam2 = [...team2];

      [newTeam1[team1PlayerIndex], newTeam2[team2PlayerIndex]] = [
        newTeam2[team2PlayerIndex],
        newTeam1[team1PlayerIndex],
      ];

      setTeam1(newTeam1);
      setTeam2(newTeam2);
      setTeam1SkillTotal(calculateSkillTotal(newTeam1));
      setTeam2SkillTotal(calculateSkillTotal(newTeam2));
    }
  };

  const calculateSkillTotal = (team) => team.reduce((sum, member) => sum + member.skill, 0);

  return (
    <Container>
      <h1>롤 팀짜기 프로그램</h1>
      <TeamForm addMember={addMember} />
      <TeamList members={members} removeMember={removeMember} updateMember={updateMember} />
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="4인 모드 (서폿 제외)"
            checked={isFourPlayerMode}
            onChange={(e) => setIsFourPlayerMode(e.target.checked)}
            className="mt-3"
          />
          <Button onClick={splitTeams} className="mt-3">
            팀 나누기
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>팀 1 (총 실력: {team1SkillTotal})</h2>
          <TeamList members={team1} removeMember={() => {}} updateMember={() => {}} />
        </Col>
        <Col>
          <h2>팀 2 (총 실력: {team2SkillTotal})</h2>
          <TeamList members={team2} removeMember={() => {}} updateMember={() => {}} />
        </Col>
      </Row>
      <Row>
        <Col>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="form-control mt-3"
          >
            {requiredPositions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          <Button onClick={() => swapPlayers(selectedPosition)} className="mt-3">
            교환
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;