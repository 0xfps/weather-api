# weather-api
API endpoint for getting weather data from different parts of the world.

## Operation
A default `GET` request sent to the base endpoint at [Weather API](https://weather-api-chi-lemon.vercel.app/), will try to use the caller's IP address to get the weather at the caller's location.

Its return values will be

```ts
res.send({
    success: false,
    msg: `The location you're calling from, ${ip}, was not found on GeoIP.`
})
```
If the IP was not found on `geo-ip` npm geolocation package.

OR

```ts
res.send({
    success: true,
    msg: `Your location, ${ip}, is empty on GeoIP!`
})
```
If the IP was there, but the location was empty.

OR 

```ts
res.send({
    success: true,
    msg: `You are calling api from Latitude ${lat} and Longitude ${lon}!`
})
```
If the location was found on `geo-ip`.

## Request calls.

Requests, of `GET` method can be made to `https://weather-api-chi-lemon.vercel.app/city/<your city>`.

Empty cities return:

```ts
res.send({
    success: false,
    msg: "City empty."
})
```

If the city is found, the data is returned in this type:

```ts
// Response for a city named 'jos' in Nigeria.
{
	"success": true,
	"msg": {
		"cloud_pct": 52,
		"temp": 21,
		"feels_like": 20,
		"humidity": 23,
		"min_temp": 21,
		"max_temp": 21,
		"wind_speed": 2.4,
		"wind_degrees": 83,
		"sunrise": 1674107166,
		"sunset": 1674149009
	}
}
```

Where `temp` is the temparature.


## API Call Limit

Cumulative of 50,000 / month.