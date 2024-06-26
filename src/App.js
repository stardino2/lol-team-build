// App.js

// 필요한 React 기능과 외부 라이브러리 컴포넌트들을 가져옵니다.
import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

// 사용자 정의 컴포넌트들을 가져옵니다.
import TeamForm from "./components/TeamForm";
import TeamList from "./components/TeamList";
import TeamDisplayList from "./components/TeamDisplayList";

// 팀 분배 로직을 가진 함수들을 가져옵니다.
import { distributeTeams, distributeARAMTeams } from "./utils/teamUtils";

// App 컴포넌트: 전체 애플리케이션의 주요 로직과 상태를 관리합니다.
const App = () => {
  // useState를 사용하여 컴포넌트의 상태를 관리합니다.
  // 각 상태는 [현재값, 값을 변경하는 함수] 형태로 정의됩니다.

  // members: 입력된 모든 멤버들의 리스트
  const [members, setMembers] = useState([]);

  // team1, team2: 나뉘어진 두 팀의 멤버 리스트
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  // selectedPosition: 현재 선택된 포지션
  const [selectedPosition, setSelectedPosition] = useState("탑");

  // gameMode: 현재 선택된 게임 모드 ('일반', '4인', '칼바람')
  const [gameMode, setGameMode] = useState("일반");

  // team1SkillTotal, team2SkillTotal: 각 팀의 총 스킬 점수
  const [team1SkillTotal, setTeam1SkillTotal] = useState(0);
  const [team2SkillTotal, setTeam2SkillTotal] = useState(0);

  // 가능한 모든 포지션들의 리스트
  const requiredPositions = ["탑", "정글", "미드", "원딜", "서폿", "칼바람"];

  // useEffect: 컴포넌트가 처음 렌더링될 때 실행되는 함수
  useEffect(() => {
    // 초기 멤버 리스트를 설정합니다.
    const initialMembers = [
      { name: "1", position: "탑", skill: 1 },
      { name: "2", position: "탑", skill: 1 },
      { name: "3", position: "정글", skill: 1 },
      { name: "4", position: "정글", skill: 1 },
      { name: "5", position: "미드", skill: 1 },
      { name: "6", position: "미드", skill: 1 },
      { name: "7", position: "원딜", skill: 1 },
      { name: "8", position: "원딜", skill: 1 },
      { name: "9", position: "서폿", skill: 1 },
      { name: "10", position: "서폿", skill: 1 },
    ];
    setMembers(initialMembers);
  }, []); // 빈 배열은 이 효과가 컴포넌트 마운트 시에만 실행됨을 의미합니다.

  // 새 멤버를 추가하는 함수
  const addMember = (member) => {
    // 멤버가 10명 미만일 때만 새 멤버를 추가합니다.
    if (members.length < 10) {
      setMembers([...members, member]);
    } else {
      alert("최대 10명까지만 입력할 수 있습니다.");
    }
  };

  // 특정 인덱스의 멤버를 제거하는 함수
  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  // 특정 인덱스의 멤버 정보를 업데이트하는 함수
  const updateMember = (index, updatedMember) => {
    const newMembers = [...members];
    newMembers[index] = updatedMember;
    setMembers(newMembers);
  };

  // 모든 멤버를 제거하는 함수
  const removeAllMembers = () => {
    setMembers([]);
  };

  // 팀을 나누는 함수
  const splitTeams = () => {
    const requiredTeamSize = gameMode === "4인" ? 4 : 5;

    // 게임 모드에 따라 필요한 포지션 설정
    let currentRequiredPositions;
    if (gameMode === "4인") {
      currentRequiredPositions = ["탑", "정글", "미드", "원딜"];
    } else if (gameMode === "칼바람") {
      currentRequiredPositions = requiredPositions;
    } else {
      currentRequiredPositions = requiredPositions.filter(
        (pos) => pos !== "칼바람"
      );
    }

    if (members.length < requiredTeamSize * 2) {
      alert(`각 팀에 ${requiredTeamSize}명씩 포함되어야 합니다.`);
      return;
    }

    if (gameMode === "칼바람") {
      // 칼바람 모드: 포지션 상관없이 팀 나누기
      const { team1, team2 } = distributeARAMTeams(members);
      setTeam1(team1);
      setTeam2(team2);
      setTeam1SkillTotal(calculateSkillTotal(team1));
      setTeam2SkillTotal(calculateSkillTotal(team2));
    } else {
      // 일반 모드와 4인 모드
      const positionGroups = members.reduce((groups, member) => {
        if (!groups[member.position]) {
          groups[member.position] = [];
        }
        groups[member.position].push(member);
        return groups;
      }, {});

      // 각 필수 포지션에 충분한 멤버가 있는지 확인
      for (const position of currentRequiredPositions) {
        if (!positionGroups[position] || positionGroups[position].length < 2) {
          alert(`${position} 포지션에 적어도 두 명씩 있어야 합니다.`);
          return;
        }
      }

      // 팀 분배 실행
      const { newTeam1, newTeam2 } = distributeTeams(
        currentRequiredPositions,
        positionGroups
      );

      // 분배 결과 확인 및 적용
      if (
        newTeam1.length === requiredTeamSize &&
        newTeam2.length === requiredTeamSize
      ) {
        setTeam1(newTeam1);
        setTeam2(newTeam2);
        setTeam1SkillTotal(calculateSkillTotal(newTeam1));
        setTeam2SkillTotal(calculateSkillTotal(newTeam2));
      } else {
        alert("팀을 나누는 데 문제가 발생했습니다. 멤버 구성을 확인해주세요.");
      }
    }
  };

  // 두 팀 간 특정 포지션의 선수를 교환하는 함수
  const swapPlayers = (position) => {
    const team1PlayerIndex = team1.findIndex(
      (member) => member.position === position
    );
    const team2PlayerIndex = team2.findIndex(
      (member) => member.position === position
    );

    if (team1PlayerIndex >= 0 && team2PlayerIndex >= 0) {
      const newTeam1 = [...team1];
      const newTeam2 = [...team2];

      // 선수 교환
      [newTeam1[team1PlayerIndex], newTeam2[team2PlayerIndex]] = [
        newTeam2[team2PlayerIndex],
        newTeam1[team1PlayerIndex],
      ];

      // 새로운 팀 구성 적용
      setTeam1(newTeam1);
      setTeam2(newTeam2);
      setTeam1SkillTotal(calculateSkillTotal(newTeam1));
      setTeam2SkillTotal(calculateSkillTotal(newTeam2));
    }
  };

  // 팀의 총 스킬 점수를 계산하는 함수
  const calculateSkillTotal = (team) =>
    team.reduce((sum, member) => sum + member.skill, 0);

  // 컴포넌트의 UI를 렌더링
  return (
    <Container>
      <h1>롤 팀짜기 by 귀뭉이</h1>

      {/* 새 멤버 입력 폼 */}
      <TeamForm addMember={addMember} positions={requiredPositions} />

      {/* 현재 멤버 목록 */}
      <Row className="mt-3">
        <Col>
          <TeamList
            members={members}
            removeMember={removeMember}
            updateMember={updateMember}
          />
        </Col>
      </Row>

      {/* 전체 멤버 삭제 버튼 */}
      <Row className="mt-2">
        <Col>
          <Button variant="danger" onClick={removeAllMembers}>
            전체 삭제
          </Button>
        </Col>
      </Row>

      {/* 게임 모드 선택 및 팀 나누기 버튼 */}
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>게임 모드</Form.Label>
            <Form.Control
              as="select"
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value)}
            >
              <option value="일반">일반 모드</option>
              <option value="4인">4인 모드</option>
              <option value="칼바람">칼바람 모드</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={splitTeams} className="mt-4">
            팀 나누기
          </Button>
        </Col>
      </Row>

      {/* 팀1과 팀2 멤버 목록을 하나의 Row에 배치 */}
      <Row>
        {/* 팀1 멤버 목록 */}
        <Col md={6}>
          <h2>팀 1 (총 실력: {team1SkillTotal})</h2>
          <TeamDisplayList members={team1} />
        </Col>

        {/* 팀2 멤버 목록 */}
        <Col md={6}>
          <h2>팀 2 (총 실력: {team2SkillTotal})</h2>
          <TeamDisplayList members={team2} />
        </Col>
      </Row>

      {/* 포지션 선택 드롭다운과 교환 버튼 */}
      <Row>
        <Col md={2}>
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
        </Col>
        <Col md={2}>
          <Button
            onClick={() => swapPlayers(selectedPosition)}
            className="mt-3"
          >
            교환
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
