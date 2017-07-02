/**
 * Created by XA on 02-Jul-17.
 */

module.exports=function (app) {

    app.get("/api/hotel/search" , findNearbyHotels)
    

};
