import request from "postman-request";
const weatherAPI = "76f3c081cd49bae5eb102cadbae2f5e8";
const forecast = (c1, c2, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=${weatherAPI}&query=${c1},${c2}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location . Try another search.", undefined);
    } else {
      const newTemp = response.body.current.temperature;
      const feels = response.body.current.feelslike;
      const weather_decription = response.body.current.weather_descriptions[0];
      const message = `${weather_decription}. It is currently ${newTemp} degrees out. It feels like ${feels} degrees out.`;
      callback(undefined, message);
    }
  });
};

export default forecast ;
