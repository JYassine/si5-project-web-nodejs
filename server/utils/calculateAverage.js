export const calculateAverage = (data) => {
    let compteur = 0;
    const results = {};
    const regions = ['11', '24', '27', '28', '32', '44', '52', '53', '75', '76', '84', '93', '94'];
    regions.forEach((region) => {
        results[region] = 0;
        data.filter(el => el.reg === region).forEach((el) => {
            compteur += 1
            results[region] += parseInt(el.P)
        })
    })
    return results;
}