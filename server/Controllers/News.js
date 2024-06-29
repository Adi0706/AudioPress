
const dotenv = require('dotenv') ; 
dotenv.config() ; 


async function handleFetchNews(req, res) {
    const { filterCategory, filterCountry } = req.body;

    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${filterCountry}&category=${filterCategory}&apiKey=${process.env.NEWS_API_KEY}`);
        
        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ error: `Error fetching news: ${response.statusText}` });
        }
    } catch (err) {
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
}
















module.exports={
    handleFetchNews,
}