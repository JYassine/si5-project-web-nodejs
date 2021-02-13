import csv from 'csvtojson';


const FILE = "sp-pe-tb-quot-fra-2021-01-31-19h20.csv";
const csvFilePath = `./data/${FILE}`;

export const convertCSVtoJSON = () => {
    return csv({
        delimiter: ';'
    })
        .fromFile(csvFilePath)
        .then((jsonObject) => {
            return jsonObject;
        })
};


