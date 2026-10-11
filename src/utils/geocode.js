import request from "postman-request";
const GeoAPI = "cc1318851f9b4b4ca5b12e3fc579b0a0";
const geocode = (address, callback) => {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${GeoAPI}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location . Try another search.", undefined);
    } else {
      const lat = response.body.features[0].properties.lat;
      const lon = response.body.features[0].properties.lon;
      const city = response.body.features[0].properties.city;
      const country = response.body.features[0].properties.country;
      const state = response.body.features[0].properties.state;
      const parsedLat = JSON.parse(lat)
      const parsedLong = JSON.parse(lon)

      if (city === undefined)
      {
        callback(undefined, {
          country,
          latitude: parsedLat,
          longitude: parsedLong
      });
    }
      else
      {
      callback(undefined, {
          country,
          // state: state,
          city,
          latitude: parsedLat,
          longitude: parsedLong
      });
      }           
    }
  });


};

export default geocode ;