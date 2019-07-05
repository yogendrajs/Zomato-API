# zomato-api

[![NPM](https://nodei.co/npm/zomato-api.png)](https://nodei.co/npm/zomato-api/)

npm package for [Zomato API](https://developers.zomato.com/documentation)

## Installation

Install with npm:

```sh
npm install zomato-api
```

## Usage

```javascript
var zomato = require('zomato-api');
var client = zomato({
userKey: 'your api token'
})
```

Note: You should [apply](https://developers.zomato.com/api#headline1) for an API token before you use this package.

## Endpoints

### Common

#### Categories

Use __getCategories__ to return a list of categories.

```javascript
client.getCategories()
  .then(res => console.log(res))
  .catch(err => console.log(err)); 
```

#### Cities

Use __getCities__ to return details for a city. You can provide any of the following parameters:

- q: query by city name
- lat: latitude
- lon: longitude
- city_ids: comma separated city_id values
- count: number of max results to display

```javascript
client.getCities({q: 'vancouver'})
  .then(res => console.log(res))
  .catch(err => console.log(err)); 
```

#### Collections

Use __getCollections__ to return restaurant collections in a city. You can provide any of the following parameters:

- city_id: id of the city for which collections are needed
- lat: latitude of any point within a city
- lon: longitude of any point within a city
- count: max number of results needed

```javascript
client.getCollections({city_id: 256})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Cuisines

Use __getCuisines__ to return a list of cuisines in a city. You can provide any of the following parameters:

- city_id: d of the city for which cuisines are needed
- lat: latitude of any point within a city
- lon: longitude of any point within a city

```javascript
client.getCuisines({city_id: 256})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Establishments

Use __getEstablishments__ to return a list of restaurant types in a city. You can provide any of the following parameters:

- city_id: id of the city
- lat: latitude of any point within a city
- lon: longitude of any point within a city

```javascript
client.getEstablishments({city_id: 256})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Geocode

Use __getGeocode__ to return a list of popular cuisines and nearby restaurants around the given coordinates. You can provide any of the following parameters:

- lat: latitude
- lon: longitude

```javascript
client.getGeocode({lat: 49.267941, lon: -123.247360})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

### Location

#### Location Details

Use __getLocationDetails__ to return top cuisines, best rated restaurants, etc. in a given location. You can provide any of the following parameters:

- entity_id: location id obtained from locations api
- entity_type: location type obtained from locations api
                
```javascript
client.getLocationDetails({entity_id: 36932, entity_type: 'group'})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Locations

Use __getLocations__ to return Zomato locations by keyword. You can provide any of the following parameters:

- query: suggestion for location name
- lat: latitude
- lon: longitude
- count: max number of results to fetch

```javascript
client.getLocations({query: 'sashimi'})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

### Restaurant

#### Daily Menu

Use __getDailyMenu__ to return daily menu using Zomato restaurant ID. You can provide any of the following parameters:

- res_id: id of restaurant whose details are requested

```javascript
client.getDailyMenu({res_id: 9186})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Restaurant

Use __getRestaurant__ to return detailed restaurant info using Zomato restaurant ID. You can provide any of the following parameters:

- res_id: id of restaurant whose details are requested

```javascript
client.getRestaurant({res_id: 9186})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Reviews

Use __getReview__ to return reviews using Zomato restaurant ID. You can provide any of the following parameters:

- res_id: id of restaurant whose details are requested
- start: fetch results after this offset
- count: max number of results to retrieve

```javascript
client.getReviews({res_id: 9186, start: 1})
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Search

Use __search__ to return info based on the following parameters:

- entity_id: location id
- entity_type: location type
- q: search keyword
- start: fetch results after offset
- count: max number of results to display
- lat: latitude
- lon: longitude
- radius: radius around (lat,lon); to define search area, defined in meters(M)
- cuisines: list of cuisine id's separated by comma
- establishment_type: estblishment id obtained from establishments call
- collection_id: collection id obtained from collections call
- category: category ids obtained from categories call
- sort: sort restaurants by ...
- order: used with 'sort' parameter to define ascending / descending
