import fs from 'fs-extra';

async function addShebang() {
	const filePath = './bin/index.js';
	const fileContent = await fs.readFile(filePath, 'utf8');

	if (!fileContent.startsWith('#!/usr/bin/env node')) {
		await fs.outputFile(filePath, `#!/usr/bin/env node\n${fileContent}`);
	}
}

addShebang().catch(console.error);
