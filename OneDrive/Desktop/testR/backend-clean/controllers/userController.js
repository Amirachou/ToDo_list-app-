const User = require("../models/User");

// 🔧 Modifier nom + image
exports.updateProfile = async (req, res) => {
  const { userId, name, avatar } = req.body;

  if (!userId || !name || !avatar) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Profil mis à jour", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
