export const getFlagName = (flag: string) => {
  switch (flag) {
    case "balance":
      return "HypeSquad Balance";
    case "bravery":
      return "HypeSquad Bravery";
    case "brilliance":
      return "HypeSquad Brilliance";
    case "bug-hunter-1":
    case "bug-hunter-2":
      return "Discord Bug Hunter";
    case "dev":
      return "Early Verified Bot Developer";
    case "events":
      return "HypeSquad Events";
    case "moderator":
      return "Discord Certified Moderator";
    case "partner":
      return "Partnered Server Owner";
    case "staff":
      return "Discord Staff";
    case "supporter":
      return "Early Supporter";
    default:
      return "";
  }
};
