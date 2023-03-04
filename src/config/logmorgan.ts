import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
export default function logMorgan(app : any) {
  const logDirectory = path.join(__dirname, 'log');
  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // [LOGGER]
  app.use(
    morgan('common', {
      stream: fs.createWriteStream(path.join(logDirectory, 'access.log'), {
        flags: 'a'
      })
    })
  );
}
