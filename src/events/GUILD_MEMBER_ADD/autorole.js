async function loadAutoroleEvent(client, logger, member) {
  const roles = member.guild.roles.cache;
  let hasFoundMemberRole = false;
  let welcomeRole = {};
  for (const role of roles) {
    const lowerCase = role[1].name.toLowerCase();
    if (lowerCase === "member" || lowerCase === "members") {
      welcomeRole = role;
      hasFoundMemberRole = true;
      break;
    }
  }
  if (hasFoundMemberRole) {
    member.roles.add(welcomeRole);
  } else {
    await member.guild.roles
      .create({
        data: {
          name: "Members",
          color: "#5ac18e",
          hoist: true
        },
        reason: "Automatically creating a Members role",
      })
      .then(console.log)
      .catch(console.error);
    const role = member.guild.roles.cache.find(role => role.name === "Members");
    member.roles.add(role);
  }
}

module.exports = loadAutoroleEvent;
