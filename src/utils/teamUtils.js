// utils/teamUtils.js

export const distributeTeams = (positions, positionGroups) => {
  let team1 = [];
  let team2 = [];
  
  positions.forEach(position => {
    const players = positionGroups[position] || [];
    players.sort((a, b) => b.skill - a.skill);
    
    for (let i = 0; i < players.length; i++) {
      if (i % 2 === 0) {
        team1.push(players[i]);
      } else {
        team2.push(players[i]);
      }
    }
  });

  // 팀의 총 실력 합 계산
  const sum = (arr) => arr.reduce((acc, curr) => acc + curr.skill, 0);
  let team1Sum = sum(team1);
  let team2Sum = sum(team2);

  // 팀 실력 차이를 최소화하기 위해 멤버 교환 시도
  for (let i = 0; i < team1.length; i++) {
    for (let j = 0; j < team2.length; j++) {
      if (team1[i].position === team2[j].position) {
        const newTeam1Sum = team1Sum - team1[i].skill + team2[j].skill;
        const newTeam2Sum = team2Sum - team2[j].skill + team1[i].skill;
        if (Math.abs(newTeam1Sum - newTeam2Sum) < Math.abs(team1Sum - team2Sum)) {
          [team1[i], team2[j]] = [team2[j], team1[i]];
          team1Sum = newTeam1Sum;
          team2Sum = newTeam2Sum;
        }
      }
    }
  }

  return { newTeam1: team1, newTeam2: team2 };
};