export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Kullanıcı adı gerekli." });
  }

  try {
    const response = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
    });

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    const user = data.data[0];

    res.status(200).json({
      id: user.id,
      username: user.username,
      displayName: user.displayName
    });

  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", detail: err.message });
  }
}
