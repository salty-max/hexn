import * as fs from 'fs';

if (process.argv.length < 4) {
	console.log('Usage: generate-bin.js <number of bytes> <filename>');
	process.exit(1);
}

const numBytes = Number(process.argv[2]);
const filename = process.argv[3];

if (!filename) {
	console.log('Filename not specified');
	process.exit(1);
}

const randomByte = () => Math.floor(Math.random() * 256) | 0;

const bytes = Array.from({length: numBytes}, randomByte);
const buffer = new Uint8Array(bytes);

fs.writeFile(filename, buffer, () => {
	// 👍
});
