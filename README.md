Week 4 Workshop Assignment

What You'll Do

Demonstrate your understanding of using the Node.js JavaScript runtime environment to set up a new set of REST API endpoints in an Express server application.
Demonstrate your understanding of using the MongoDB database with the Mongoose ODM library to set up a Schema and Model for a collection of documents, and interact with the database through your Express server application.
Demonstrate your ability to use Mongoose population.


Instructions

In this assignment, you will add support for five new endpoints. These endpoints will support GET, POST, and DELETE requests for a user's list of favorite campsites, as well as POST and DELETE requests for a single, specific favorite campsite. You will be working with files in the nucampsiteServer folder.


Task 1: 

Add Mongoose Schema and Model for favorites collection
Create module: In the nucampsiteServer/models folder, create a new file named favorite.js.
Schema: In this file, create a new Mongoose Schema named favoriteSchema. The favoriteSchema should have two fields: user and campsites. Both should have the type of mongoose.Schema.Types.ObjectId, and a ref field to their corresponding Model. The campsites field's properties should be enclosed in an array. See the assignment video for a tip on this step.
Model: Create and export a Model named Favorite from this Schema.


Task 2: 

Implement the favoriteRouter and support the endpoints
Create favoriteRouter: In the routes folder, create a new file named favoriteRouter.js.
Import/Export: Using the require function, import the express module, then also import the local file-based modules you have made: cors, authenticate, and Favorite (from the models folder), using the appropriate paths. Create the favoriteRouter using the express.Router() method as you have done in other router modules. Then be sure to export favoriteRouter.
Routes: Set up two routes using favoriteRouter.route('/') and favoriteRouter.route('/:campsiteId').
Set up CORS:
Preflight requests to both routes using the .options() method as you have done in the other routers, with the cors.corsWithOptions function as the first middleware in the .options method's argument list, followed by a request handler middleware that simply responds with a status code of 200.
Chain .get(), .post(), .put(), and .delete() methods to both routes, giving either the cors.cors function (for .get) or the cors.corsWithOptions function (for the rest) as the first middleware in their argument lists.
Authentication: For the second middleware in the get/post/put/delete routing methods' argument lists, use the authenticate.verifyUser function.
Handle Requests: Now you will add a final request handling middleware function to each of the get/post/put/delete routing methods for both the /favorites and /favorites/:campsiteId paths. Give the function arguments of req, res, and next as appropriate.
If so, then you will check which campsites in the request body are already in the campsites array of the favorite document, if any, and you will only add to the document those that are not already there. There are various ways to conduct this check. The use of JavaScript array methods forEach, includes, and push can help you with this task.
If there is no favorite document for the user, you will create a favorite document for the user and add the campsite IDs from the request body to the campsites array for the document. Save the favorite document, set the response Content-Type header and a status code of 200, and send the response back using res.json() with the favorite document as its argument.
If it exists, delete the campsite in the URL parameter req.params.campsiteId from its campsites array. There are multiple ways to approach this. Because you are deleting an element from an array and not a single document, you can not use the findOneAndDelete method. Instead, you could use a combination of indexOf and splice methods on the favorite.campsites array to remove the specified campsite. Alternatively, you could use the filter array method. Afterward, save the document then return a response with a status code of 200, a Content-Type header of 'application/json', and the favorite document.
If no favorite document exists, return a response with a Content-Type header of 'text/plain' and a message that there are no favorites to delete.
GET: When the user does a GET operation on '/favorites', retrieve the favorite document for that user using Favorite.find(), passing to the find method the object { user: req.user._id } as its only argument. To the retrieved favorite document,chain two populate() methods to populate the user and campsites refs. To the res object, set an appropriate Content-Type header and a status code of 200. Return the favorite document using the res.json() method with the appropriate argument.
POST to /favorites: When the user does a POST operation on '/favorites' by including a message in the format of [{"_id":"campsite ObjectId"}, . . . , {"_id":"campsite ObjectId"}] in the body of the message (see Testing section for example), you will check if the user has an associated favorite document. Use Favorite.findOne({user: req.user._id }) for this.
Then, check if the favorite document exists:
DELETE to /favorites: When the user performs a DELETE operation on '/favorites', use findOneAndDelete to locate the favorite document corresponding to this user and delete it. For the response, set a status code of 200. If a favorite document was found, then set the Content-Type header to "application/json" and return the favorite document with res.json(). If no favorite document was found, then set the Content-Type header to 'text/plain' and use res.end() to send the response 'You do not have any favorites to delete.'
POST to /favorites/:campsiteId: When the user performs a POST operation on'/favorites/:campsiteId', use findOne to locate the favorites document for the user. Then, you will add the campsite specified in the URL parameter to the favorite.campsites array, if it's not already there. If the campsite is already in the array, then respond with a message saying "That campsite is already in the list of favorites!". If the user has not previously defined any favorites, then you will need to create a new Favorite document for this user and add the campsite to it. Note: As a bonus challenge, you could add error checking to make sure that the campsiteId in the URL parameter corresponds to a valid campsite, but it is not required for this assignment.
DELETE to /favorites/:campsiteId: When the user performs a DELETE operation on '/favorites/:campsiteId', use findOne to find the favorites document for the user.
Unsupported: For the GET request to '/favorites/:campsiteId' and the PUT request to '/favorites' and '/favorites/:campsiteId', return a response with a status code of 403 and a message that the operation is not supported.


Task 3: 

Integrate the new router into your Express application
Update app.js to implement the new favoriteRouter.


Testing
 
Add Campsites

You will first need to add a few campsites to test with. You can do this through Postman or MongoDB Compass. It is simpler to do this through Compass since you need to log in as an admin account through Postman, copy the JWT token, etc.
To use MongoDB Compass to add campsites:
Open MongoDB Compass and select Open MongoDB Shell, then enter use nucampsite.
Let's clear out any existing campsites with:
db.campsites.drop()
Then, copy the following and paste it:
db.campsites.insertMany([ {
    "name": "React Lake Campground",
    "image": "images/react-lake.jpg",
    "elevation": 1233,
    "featured": false,
    "cost": 65,
    "description": "Nestled in the foothills of the Chrome Mountains, this campground on the shores of the pristine React Lake is a favorite for fly fishers."
    },
    {
    "name": "Chrome River Campground",
    "image": "images/chrome-river.jpg",
    "elevation": 877,
    "featured": false,
    "cost": 77,
    "description": "Spend a few sunny days and starry nights beneath a canopy of old-growth firs at this enchanting spot by the Chrome River."
    },
    {
    "name": "Breadcrumb Trail Campground",
    "image": "images/breadcrumb-trail.jpg",
    "elevation": 2901,
    "featured": false,
    "cost": 24,
    "description": "Let NuCamp be your guide to this off-the-beaten-path, hike-in-only campground."
    }
]);
 
Use db.campsites.find() to verify that the campsites have been added. Copy down their _ids so that you can use them to test.
Postman

Now use Postman to test. 

Before anything else, log in and obtain a JWT in one of the ways that you have learned, and copy that JWT to the Authorization tab with Bearer Token selected.
Test that you are able to POST to https://localhost:3443/favorites a list of campsites using two of the ObjectIDs of the campsites that you created. Example JSON body (replace the Object IDs here with the Object IDs from the campsites that you added):
[{"_id":"5e56efb8bc577155cbb46003"}, {"_id":"5e56efb8bc577155cbb46004"}]

Use the third campsite to test that you can POST a single favorite by sending a request to the :/campsiteId path of the favoriteRouter, e.g. (replace the ObjectID with your own): POST to https://localhost:3443/favorites/5e56efb8bc577155cbb46005
Test that if you try the same POST as above again, you get a response saying "That campsite is already a favorite!"
Test that you are able to GET a list of favorites from https://localhost:3443/favorites. Make sure that the user and campsites information is populated in the response.
Test that you are able to DELETE a single favorite.
Test that you are able to DELETE the entire list of favorites.
Test the unsupported routes, and make sure they are giving you an error 403 and the unsupported message.
