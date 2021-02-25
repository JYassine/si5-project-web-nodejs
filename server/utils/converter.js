import csv from 'csvtojson';


const FILE_FRA = "sp-pe-tb-quot-fra-2021-01-31-19h20.csv";
const FILE_REG = "sp-pe-tb-quot-reg-2021-02-21-19h20.csv";
const csvFraPath = `./data/${FILE_FRA}`;
const csvRegPath = `./data/${FILE_REG}`;

export const convertCSVtoJSON = async (file) => {
    let csvPath;
    if (file === 'fra') {
        csvPath = csvFraPath;
    } else if (file === 'reg') {
        csvPath = csvRegPath;
    }

        return csv({
            delimiter: ';'
        })
            .fromFile(csvPath)
            .then((jsonObject) => {
                return jsonObject;
            })
};


