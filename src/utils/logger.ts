import chalk from "chalk";

import ChalkColor from "../types/chalk";

export default (color: ChalkColor, bot: string, message: string) => {
  console.log(
    chalk[color](`[${bot}] [${new Date().toLocaleTimeString()}]: `) +
      chalk[color](message)
  );
};
