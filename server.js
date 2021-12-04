/* 
Imports
*/
    // NPM modules
    require('dotenv').config(); //=> https://www.npmjs.com/package/dotenv
    const express = require('express'); //=> https://www.npmjs.com/package/express

    // Services
    const MONGOclass = require('./services/mongo.class');
    const { cryptData, decryptData } = require('./services/crypto.service');

    // Inner module
    const Model = require('./models/item.model')
//

/* 
Server class
*/
class ServerClass{
    constructor(){
        this.server = express();
        this.port = process.env.PORT;
        this.MongoDB = new MONGOclass();
    }

    init(){
        //=> Set body request with ExpressJS (http://expressjs.com/fr/api.html#express.json)
        this.server.use(express.json({limit: '20mb'}));
        this.server.use(express.urlencoded({ extended: true }))

        //=> Start server setup
        this.setup();
    }

    setup(){
        /* 
        CRUD: Create item
        */
            this.server.post('/item', (req, res) => {
                // Check request body
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    // Send body error
                    return res.status(500).json({
                        endpoint: req.originalUrl,
                        method: req.method,
                        message: `No data provided in the body request`,
                        err: null,
                        data: null,
                        status: 500
                    });
                }
                else{
                    // Check mandatory informations
                    if( !req.body.headline || !req.body.abstract ){
                        // Send mandatory error
                        return res.status(500).json({
                            endpoint: req.originalUrl,
                            method: req.method,
                            message: `Miss mandatory informations headline or abstract`,
                            err: null,
                            data: null,
                            status: 500
                        });
                    }
                    else{
                        // Create crtpted item from Mongoose model
                        Model.create({
                            headline: cryptData(req.body.headline),
                            abstract: cryptData(req.body.abstract),
                        })
                        .then( mongooseSuccess => {
                            // Send success request
                            return res.status(200).json({
                                endpoint: req.originalUrl,
                                method: req.method,
                                message: `Request succeed`,
                                err: null,
                                data: decryptData(mongooseSuccess, `headline`, `abstract`),
                                status: 200
                            });
                        })
                        .catch( mongooseError => {
                            // Send error request
                            return res.status(500).json({
                                endpoint: req.originalUrl,
                                method: req.method,
                                message: `Request failed`,
                                err: mongooseError,
                                data: null,
                                status: 500
                            });
                        })
                    }
                }
            });
        /* 
        CRUD: Read item
        */  
            // All items
            this.server.get('/item', (req, res) => {
                // Read items from Mongoose model
                Model.find()
                .exec( ( mongooseError, mongooseSuccess ) => {
                    if( mongooseError ){ 
                        // Send error request
                        return res.status(500).json({
                            endpoint: req.originalUrl,
                            method: req.method,
                            message: `Request failed`,
                            err: mongooseError,
                            data: null,
                            status: 500
                        });
                    }
                    else{ 
                        // Decrype item data
                        let mongooseDecryped = [];
                        for( let item of mongooseSuccess ){
                            mongooseDecryped.push(decryptData(item, `headline`, `abstract`))
                        }

                        // Send success request
                        return res.status(200).json({
                            endpoint: req.originalUrl,
                            method: req.method,
                            message: `Request succeed`,
                            err: null,
                            data: mongooseDecryped,
                            status: 200
                        });
                    }
                })
            });

            // Item by ID
            this.server.get('/item/:id', (req, res) => {
                // Read items from Mongoose model
                Model.findById(req.params.id)
                .exec( ( mongooseError, mongooseSuccess ) => {
                    if( mongooseError ){ 
                        // Send error request
                        return res.status(500).json({
                            endpoint: req.originalUrl,
                            method: req.method,
                            message: `Request failed`,
                            err: mongooseError,
                            data: null,
                            status: 500
                        });
                    }
                    else{
                        // Send success request
                        return res.status(200).json({
                            endpoint: req.originalUrl,
                            method: req.method,
                            message: `Request succeed`,
                            err: null,
                            data: decryptData(mongooseSuccess, `headline`, `abstract`),
                            status: 200
                        });
                    }
                })
            });
        //

        /* 
        CRUD: Updata item
        */
            this.server.put('/item/:id', (req, res) => {
                // Check body data
                if( typeof req.body === 'undefined' || req.body === null || Object.keys(req.body).length === 0 ){ 
                    // Send body error
                    return res.status(500).json({
                        endpoint: req.originalUrl,
                        method: req.method,
                        message: `No data provided in the body request`,
                        err: null,
                        data: null,
                        status: 500
                    });
                }
                else{
                    // Read items from Mongoose model
                    Model.findById(req.params.id)
                    .exec( async ( mongooseError, mongooseSuccess ) => {
                        if( mongooseError ){ 
                            // Send error request
                            return res.status(500).json({
                                endpoint: req.originalUrl,
                                method: req.method,
                                message: `Request failed`,
                                err: mongooseError,
                                data: null,
                                status: 500
                            });
                        }
                        else{
                            // Update mongoose object
                            mongooseSuccess.headline = cryptData(req.body.headline);
                            mongooseSuccess.abstract = cryptData(req.body.abstract);

                            // Save modification
                            await mongooseSuccess.save();

                            // Send success request
                            return res.status(200).json({
                                endpoint: req.originalUrl,
                                method: req.method,
                                message: `Request succeed`,
                                err: null,
                                data: decryptData(mongooseSuccess, `headline`, `abstract`),
                                status: 200
                            });
                        }
                    })
                }
            });
        //

        /* 
        CRUD: Delete item
        */
            this.server.delete('/item/:id', (req, res) => {
                // Delete items from Mongoose model
                Model.deleteOne({ _id: req.params.id })
                .exec( async ( mongooseError, mongooseSuccess ) => {
                    if( mongooseError ){ 
                        // Send error request
                        return res.status(500).json({
                            endpoint: req.originalUrl,
                            method: req.method,
                            message: `Request failed`,
                            err: mongooseError,
                            data: null,
                            status: 500
                        });
                    }
                    else{
                        // Send success request
                        return res.status(200).json({
                            endpoint: req.originalUrl,
                            method: req.method,
                            message: `Request succeed`,
                            err: null,
                            data: mongooseSuccess,
                            status: 200
                        });
                    }
                })
            });
        //

        //=> Launch server
        this.launch();
    }

    launch(){
        // Start MongoDB connection
        this.MongoDB.connectDb()
        .then( db => {
            // Start server
            this.server.listen(this.port, () => {
                console.log({
                    node: `http://localhost:${this.port}`,
                    mongo: db.url,
                });
            });
        })
        .catch( dbErr => console.log('MongoDB Error', dbErr));
    }
}
//

/* 
Start server
*/
    const apIRestfull = new ServerClass();
    apIRestfull.init();
//