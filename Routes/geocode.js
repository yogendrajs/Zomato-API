module.exports = function(geocode, iplocation, publicIp, client){
    // for finding geocode
    geocode.get('/', (req, res) => {
        (async () => {
            let ip = await publicIp.v4()

            iplocation(ip)
            .then((result) => {
                let {country, region, city, postal, ip, latitude: lat, longitude: lon} = result;
                // console.log(`You're from ${country} and you live in ${region}, the city name is ${city}. Your postal code is ${postal}. 
                // Your latitude is ${lat} and longitude is ${lon}`);
                console.log(ip)

                // res.send(`You're from ${country} and you live in ${region}, the city name is ${city}. Your postal code is ${postal}. Your latitude is ${lat} and longitude is ${lon}`);
                client.getGeocode({
                    lat: lat, //latitude
                    lon: lon //longitude
                    // lat: lat,
                    // lon: lon
                    }, function(err, result){
                        if(!err){
                            // let restaurants = JSON.stringify(result);
                            let obj = JSON.parse(result);
                            let {location} = obj;
                            console.log('You\'ve been tracked!');
                            location['Your Public IP'] = ip;
                            res.send(location);
                            // part two
                            
                            
                        }else {
                        console.log(err);
                        return res.end('something went wrong');
                        }
                    });
            })
            .catch(err => {
                console.log(err);
                res.send('err');
            });
        })();
    })
}