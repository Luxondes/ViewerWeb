const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

const parser = new xml2js.Parser();


function htmlspecialchars(s){
	return (typeof s=='string')?s.replace(/\</g,'&lt;')
								 .replace(/\>/g,'&gt;')
								 .replace(/&lt;/g,'<pre>&lt;')
								 .replace(/&gt;/g,'&gt;</pre>')
								 .replace(/(\n)/gm,'<br>')

								 :'';
}


// fs.readFile('emc-interference-freq.xml', (err, data) => {
// 	parser.parseString(data, (err, result) => {
// 		console.log(util.inspect(result));
// 	});
// });


let data = fs.readFileSync('example.xml', 'utf8');
data = htmlspecialchars(data)
console.log(data);

