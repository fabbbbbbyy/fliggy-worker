const ProfileModel = require("../../models/ProfileSchema");

async function hasProfile(userID) {
  let profileData;
  try {
    profileData = await ProfileModel.findOne({
      userID: userID,
    });
    if (!profileData) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
    hasProfile
};