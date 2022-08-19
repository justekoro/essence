export default async function handler(req, res) {
  try {
    const { lon, lat } = req.query;
  
    if(!lon || !lat) return res.status(401).send("Missing parameters");
    
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
  
    res.send(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
}