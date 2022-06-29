const fs = require('fs');

const data = fs.readFileSync('test.dat', 'utf8');

let lines = data.split('\r\n')

for (let i = 0; i < lines.length; i++) {
	lines[i] = lines[i].split('\t');
	for (let j = 0; j < lines[i].length; j++) {
		lines[i][j] = parseFloat(lines[i][j]);
	}
}

console.log(lines);
