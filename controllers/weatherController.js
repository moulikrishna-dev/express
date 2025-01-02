import axios from "axios";

const getWeather = async (req, res) => {
    try {
        const options = {
            method: "GET",
            url: `https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}`,
            params: {
                query: "17.527690,78.359757",
            },
        };
        const { data } = await axios.request(options);
        res.status(200).json(data); // Send only the data portion of the response
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" }); // Return an error response
    }
};

export default {
    getWeather
};