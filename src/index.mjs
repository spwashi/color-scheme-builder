import minimist      from "minimist";
import {resolveArgs} from "./cli/args.mjs";
import {generateSvg} from "./script/generateSvg.mjs";

const config = resolveArgs(minimist(process.argv));

generateSvg(config);