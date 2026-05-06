const fs = require('fs');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

async function build() {
  const jsSource = fs.readFileSync('tree.js', 'utf8');
  const jsResult = await minify(jsSource, { sourceMap: false });
  if (jsResult.error) {
    throw jsResult.error;
  }
  fs.writeFileSync('tree.min.js', jsResult.code, 'utf8');

  const cssSource = fs.readFileSync('tree.css', 'utf8');
  const cssResult = new CleanCSS().minify(cssSource);
  if (cssResult.errors && cssResult.errors.length) {
    throw new Error(cssResult.errors.join('\n'));
  }
  fs.writeFileSync('tree.min.css', cssResult.styles, 'utf8');

  console.log('Build completed: tree.min.js, tree.min.css');
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
