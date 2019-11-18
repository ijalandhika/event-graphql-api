const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp  = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');


const app = express();

app
    .use(bodyParser.json())
    .use('/graphql', graphqlHttp({
        schema: graphQlSchema, 
        rootValue: graphQlResolvers,
        graphiql: true
    }));

const connection  = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongotest-7qtmn.gcp.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose
.connect( connection, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => {
    app.listen(3000);
}).catch((err) => {
    console.log(err);
});

