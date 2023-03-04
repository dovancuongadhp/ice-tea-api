import fs from "fs";
import path from "path";
export default function Banner() {
  const dataPath = path.join(__dirname, "banner.txt");
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('\x1b[32m',data,'\x1b[0m');
  });
}
