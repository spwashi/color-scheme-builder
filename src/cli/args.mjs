import {help} from "./instructions.mjs";
import path   from "path";
import {existsSync, readFileSync} from "fs";

export function resolveArgs(argv) {
  const ERROR_PREFIX = 'ERROR:';
  if (argv.h || argv.help) {
    console.log(help)
    return;
  }
  const inputPath = argv.c;
  let outDir;
  outDir          = argv.o || argv.outDir;
  if (!inputPath) {
    console.error(`${ERROR_PREFIX} missing config\n${help}`);
    return;
  }
  if (!outDir) {
    console.error(`${ERROR_PREFIX} missing outDir\n${help}`);
    return;
  }
  outDir = path.resolve(outDir);

  if (!existsSync(outDir)) {
    console.error(`${ERROR_PREFIX} outDir does not exist\n${help}`)
    return;
  }
  const colors = JSON.parse(readFileSync(inputPath, 'utf-8'));

  return {
    outDir,
    outName: 'color-scheme.svg',
    colors,
  };
}