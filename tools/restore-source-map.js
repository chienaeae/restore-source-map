const { SourceMapConsumer } = require("source-map");
const path = require("path");
const fs = require("fs");

const outputDirectory = "./output";
const entryDirectory = "./dist";
const entryFile = `${entryDirectory}/bundle.js`;

const restore = (content, baseDir, callback) => {
  const sourceMapData = content.split(";base64,")[1];
  let buff = new Buffer.from(sourceMapData, "base64");
  let rawSourceMap = buff.toString("ascii");
  SourceMapConsumer.with(rawSourceMap, null, (consumer) => {
    consumer.sources.forEach((source) => {
      const content = consumer.sourceContentFor(source);
      if (source.includes("..")) {
        source = source.replace("..", "");
      }
      if (content) {
        const filePath = path.join(baseDir, source);
        console.log(
          "[source-map] create ",
          filePath,
          " from ",
          `${entryDirectory}/${source}`
        );
        fs.mkdirSync(path.dirname(filePath), {
          recursive: true,
        });
        fs.writeFileSync(filePath, content);
      }
    });
    callback?.();
  });
};

const restoreDir = (dirPath, callback) => {
  let files = fs.readdirSync(dirPath, null);
  files.forEach((file) => {
    let fileWithPath = path.join(dirPath, file);
    let stats = fs.lstatSync(fileWithPath);
    // Note:
    // do not restore node_modules code
    if (fileWithPath.includes("node_modules")) {
      return;
    }
    if (stats.isFile()) {
      const content = fs.readFileSync(fileWithPath, "utf-8");
      restore(content, outputDirectory, () => {
        console.log("remove file: ", fileWithPath);
        try {
          fs.unlinkSync(fileWithPath);
        } catch (err) {
          // FIXME
        }
      });
    } else {
      restoreDir(fileWithPath, () => {
        console.log("remove folder: ", fileWithPath);
        fs.rmSync(`${dirPath}/${file}`, { recursive: true });
      });
    }
  });
  callback?.();
};

function main() {
  let exist = fs.existsSync(outputDirectory);
  if (exist) {
    fs.rmSync(outputDirectory, { recursive: true });
  }
  let content = fs.readFileSync(entryFile, "utf-8");
  restore(content, outputDirectory, () => {
    restoreDir(outputDirectory);
  });
}

main();
