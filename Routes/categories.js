module.exports = function(categories, client){
    // for finding categories
    categories.get('/', (req, res) => {
        client.getCategories(null, function(err, result){
            if(!err){
                console.log('result accessed!');
                res.end(result);
            }else {
                console.log(err);
                res.end('Invalid Key');
            }
        })
    })
}