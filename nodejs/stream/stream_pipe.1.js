const fs = require('fs');

fs.createReadStream('./test.mp4').pipe(fs.createWriteStream('pipe.mp4'));