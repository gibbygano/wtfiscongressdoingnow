export const ordinalize = function (nbString: string): string {
  const nb = Number.parseInt(nbString);
  if (Number.isNaN(nb)) {
    throw Error(`${nbString} is not a number`);
  }

  const nMod100 = nb % 100;
  if (nMod100 >= 11 && nMod100 <= 13) {
    return nbString + "th";
  }

  switch (nb % 10) {
    case 1:
      return nbString + "st";

    case 2:
      return nbString + "nd";

    case 3:
      return nbString + "rd";

    default:
      return nbString + "th";
  }
};
