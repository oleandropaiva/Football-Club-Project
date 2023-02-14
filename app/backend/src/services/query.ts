const matches = 'TRYBE_FUTEBOL_CLUBE.matches';
const teams = 'TRYBE_FUTEBOL_CLUBE.teams';

const homeTeam = `SELECT
T.team_name AS name,
SUM(
  CASE
    WHEN M.home_team_goals > M.away_team_goals THEN 3
    WHEN M.home_team_goals = M.away_team_goals THEN 1
    WHEN M.home_team_goals < M.away_team_goals THEN 0
  END
) AS totalPoints,
  COUNT(M.home_team_id) AS totalGames,
  SUM(M.home_team_goals > M.away_team_goals) AS totalVictories,
  SUM(M.home_team_goals = M.away_team_goals) AS totalDraws,
  SUM(M.home_team_goals < M.away_team_goals) AS totalLosses,
  SUM(M.home_team_goals) AS goalsFavor,
  SUM(M.away_team_goals) AS goalsOwn,
  SUM(M.home_team_goals - M.away_team_goals) AS goalsBalance
FROM ${matches} AS M
INNER JOIN ${teams} AS T
ON M.home_team_id = T.id AND M.in_progress = false
GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default { homeTeam };
