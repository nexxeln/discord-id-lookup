const badges = [
  ["moderator", 262144],
  ["dev", 131072],
  ["bug-hunter-2", 16384],
  ["supporter", 512],
  ["balance", 256],
  ["brilliance", 128],
  ["bravery", 64],
  ["bug-hunter-1", 8],
  ["events", 4],
  ["partner", 2],
  ["staff", 1],
];

export const getBadges = (val: number) => {
  let result: string[] = [];

  badges.forEach(([name, a]: any) => {
    let value = Math.floor(val / a);

    if (value) {
      val -= value * a;
      result.push(name);
    }
  });

  return result;
};
