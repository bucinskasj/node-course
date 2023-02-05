const fs = require("fs");

//Blocking, sync way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocade: ${textIn}. \nCreated on${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written');

//Non-blocking, async wait

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    if (err) return console.log('ERROR!');


    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
            console.log(data3);

            fs.writeFile(
                "./txt/final.txt",
                `${data2}\n${data3}`,
                "utf-8",
                (err) => {
                    console.log("Data files have been written");
                }
            );
        });
    });
});

console.log("Will read file!");
