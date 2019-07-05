module.exports = function(search, path, client){
    search.get('/', (req, res) => {
        // console.log(path.join(__dirname, '../views/search.htm'))
        res.sendFile(path.join(__dirname, '../views/search.htm'));
    })
    
    search.post('/', (req, res) => {
        client.getLocations({
            query: req.body.search, // suggestion for location name
            // lat:"28.613939", //latitude
            // lon:"77.209021", //longitude
            count:"" // number of maximum result to fetch
            }, function(err, result){
                if(!err){
                    let apidata = JSON.parse(result);
                    let locate = apidata.location_suggestions;
                    let lat = locate[0].latitude;
                    let lon = locate[0].longitude;
                    // let q = req.body.search;
                    console.log(lat, lon);
    
                    client.getGeocode({
                        lat: lat, //latitude
                        lon: lon //longitude
                        // lat: lat,
                        // lon: lon
                        }, function(err, result){
                            if(!err){
                                // let restaurants = JSON.stringify(result);
                                let obj = JSON.parse(result);
                                let {nearby_restaurants} = obj;
                                // console.log(nearby_restaurants);
                                // res.send(nearby_restaurants);
                                let mainlist = [];
                                let mainobj;
                                for (let i of nearby_restaurants){
                                    var {restaurant} = i;
                                    mainobj = {}
                                    mainobj.name = restaurant.name;
                                    mainobj.average_cost_for_two = restaurant.average_cost_for_two;
                                    mainobj.price_range = restaurant.price_range;
                                    mainobj.has_online_delivery = restaurant.has_online_delivery;
                                    mainobj.featured_photo = restaurant.featured_image;
                                    mainobj.cuisines = restaurant.cuisines;
                                    mainobj.address = i.restaurant.location.address;
                                    mainlist.push(mainobj);
                                }
                                // console.log(mainlist)
                                return res.render('zomato.ejs', {data: mainlist})
                            }else {
                              console.log(err);
                              return res.end('something went wrong');
                            }
                        });
    
                    
                }else {
                  console.log(err);
                }
        })
    })
}