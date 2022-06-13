export const getFlagName = (flag: string) => {
  if (flag === "balance") {
    return "HypeSquad Balance";
  } else if (flag === "bravery") {
    return "HypeSquad Bravery";
  } else if (flag === "brilliance") {
    return "HypeSquad Brilliance";
  } else if (flag === "bug-hunter-1" || flag === "bug-hunter-2") {
    return "Discord Bug Hunter";
  } else if (flag === "dev") {
    return "Early Verified Bot Developer";
  } else if (flag == "events") {
    return "HypeSquad Events";
  } else if (flag === "moderator") {
    return "Discord Certified Moderator";
  } else if (flag === "partner") {
    return "Partnered Server Owner";
  } else if (flag === "staff") {
    return "Discord Staff";
  } else if (flag === "supporter") {
    return "Early Supporter";
  }
};
