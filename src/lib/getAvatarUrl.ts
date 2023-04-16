const getAvatarUrl = async (steamID: string) => {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=5F069022B88FDA48F1091AC894BE78CC&steamids=${steamID}`
  );

  const data = await response.json();
  if (data.response.players.length === 0) {
    return "";
  }

  return data.response.players[0].avatarfull;
};

export default getAvatarUrl;
