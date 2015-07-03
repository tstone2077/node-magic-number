/*
	Magic number detection for Node.js
	Copyright 2015 Sam Saint-Pettersen

	Released under the MIT License.
*/

/// <reference path="typings/node.d.ts" />

import fs = require('fs');

function toChar(dec: number): string {
	return String.fromCharCode(dec);
}

class MagicNumber {

	public static detectFile(file: string): string {
		var type: string = 'Error: File doesn\'t exist.';
		if(fs.existsSync(file)) {
			var mn: Buffer = fs.readFileSync(file);
			if(toChar(mn[0]) == 'P' && toChar(mn[1]) == 'K') {
				type = 'application/zip';
			}
			else if(toChar(mn[0]) == '7' && toChar(mn[1]) == 'z') {
				type = 'application/x-7z-compressed';
			}
			else if(mn[0] == 253 && toChar(mn[1]) == '7' && toChar(mn[2]) == 'z') {
				type = 'application/x-xz';
			}
			else if(toChar(mn[0]) == 'R' && toChar(mn[1]) == 'a' && toChar(mn[2]) == 'r') {
				type = 'application/x-rar-compressed';
			}
			else if(toChar(mn[0]) == 'G' && toChar(mn[1]) == 'I' && toChar(mn[2]) == 'F') {
				type = 'image/gif';
			}
			else if(toChar(mn[1]) == 'P' && toChar(mn[2]) == 'N' && toChar(mn[3]) == 'G') {
				type = 'image/png';
			}
			else if(toChar(mn[0]) == 'ÿ' && toChar(mn[1]) == 'Ø' && toChar(mn[2]) == 'ÿ' && toChar(mn[3]) == 'à') {
				type = 'image/jpeg';
			}
			else if(toChar(mn[0]) == '%' && toChar(mn[1]) == '!' && toChar(mn[2]) == 'P' && toChar(mn[3]) == 'S') {
				type = 'application/postscript';
			}
			else if(toChar(mn[0]) == '%' && toChar(mn[1]) == 'P' && toChar(mn[2]) == 'D' && toChar(mn[3]) == 'F') {
				type = 'application/pdf';
			}
			else if(toChar(mn[0]) == 'Ê' && toChar(mn[1]) == 'þ' && toChar(mn[2]) == 'º' && toChar(mn[3]) == '¾') {
				type = 'application/java-byte-code';
			}
			else if(toChar(mn[0]) == '8' && toChar(mn[1]) == 'B' && toChar(mn[2]) == 'P' && toChar(mn[3]) == 'S') {
				type = 'image/vnd.adobe.photoshop';
			}
			else if(toChar(mn[0]) == 'O' && toChar(mn[1]) == 'g' && toChar(mn[2]) == 'g' && toChar(mn[3]) == 'S') {
				type = 'audio/ogg';
			}
			else {
				type = 'unknown';
			}
 		}
		return type;
	}
}

export = MagicNumber;
