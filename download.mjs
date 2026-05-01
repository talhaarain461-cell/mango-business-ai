import fs from 'fs';
import https from 'https';
import path from 'path';

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to: ${response.headers.location}`);
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  try {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    console.log('Downloading image 1...');
    await download('https://drive.google.com/uc?export=download&id=1Rjn7IeZL_MwXn1FS_gHCcwje09M22hzK', 'public/about-1.jpg');
    console.log('Downloading image 2...');
    await download('https://drive.google.com/uc?export=download&id=1hN_bGhe0-UrPCgKcLWpSAk_VmiebWjO2', 'public/about-2.jpg');
    console.log('Downloading image 3...');
    await download('https://drive.google.com/uc?export=download&id=1hNsdgZmQA9FP3pZ65HGVCrDnlYPEBgHY', 'public/about-3.jpg');
    console.log('Downloading image 4...');
    await download('https://drive.google.com/uc?export=download&id=1kXvhbTj5WKi90a4_8RNUDc2o65of5uPk', 'public/about-4.jpg');
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

run();
