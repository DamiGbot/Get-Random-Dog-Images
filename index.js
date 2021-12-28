const fs = require("fs");
const path = require("path");
const superagent = require("superagent");

const readFile = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, "utf-8", (err, data) => {
			if (err) reject("File Path not found!!!😥");
			resolve(data);
		});
	});
};

const writeFile = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject("Could not write the file😥");
			resolve("File written successfully!!😁");
		});
	});
};

const getDogPic = async () => {
	try {
		const data = await readFile(path.resolve("dog.txt"));
		console.log(data);

		const res1Pro = superagent(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		const res2Pro = superagent(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		const res3Pro = superagent(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

		const resArray = all.map((item) => item.body.message);
		console.log(resArray);

		const writtenFile = await writeFile(
			path.resolve("dog-img.txt"),
			resArray.join("\n")
		);
		console.log(writtenFile);
	} catch (err) {
		console.log(err);
		throw err;
	}
	return "Done with request!!!";
};

(async () => {
	try {
		console.log("Im inside in IIFE");
		const data = await getDogPic();
		console.log(data);
	} catch (err) {
		console.log("Error 💥");
	}
})();

console.log("Top level Code");

// getDogPic()
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => console.log(err.message));

// readFile(path.resolve("dog.txt"))
// 	.then((data) => {
// 		return superagent(`https://dog.ceo/api/breed/${data}/images/random`);
// 	})
// 	.then((res) => {
// 		return writeFile(path.resolve("dog-img.txt"), res.body.message);
// 	})
// 	.then((data) => {
// 		return console.log(data);
// 	})
// 	.catch((err) => console.log(err));
