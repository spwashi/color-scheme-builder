# Color Scheme Builder

Creates an SVG that describes the colors in a color scheme.

The output should give some insight into the relationships between each color in the scheme.

## Usage

```bash
node src/index.mjs --help

> Usage: node index.js -o [outDir] -c [configFile] [options]
>
> Required Arguments:
>   -o, --outDir: the output directory
>   -c, --config: the config file to use
> 
>  Options:
>    -h, --help:  display this help dialog
```

```bash
node src/index.mjs -o ./example/out -c example/colors.config.json
```

## Output

### color-scheme.svg

![output color scheme](https://github.com/spwashi/color-scheme-builder/blob/main/example/out/color-scheme.svg)