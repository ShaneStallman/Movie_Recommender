
async function getGenres(){
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e88a0805d4mshe025932791973e2p131fcbjsn2e209adf7d6b',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return result;
    } catch (error) {
        return error;
    }
}

getGenres()
    .then(genres => console.log(genres))
    .catch(error => console.error(error));