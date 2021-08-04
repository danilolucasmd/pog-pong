export const variables = {
  barSize: {
    width: 15,
    height: 130
  },
  ballSize: {
    width: 15,
    height: 15
  }
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function lerp (value1: number, value2: number, amount: number) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};