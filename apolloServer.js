const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const Book = require('./book')

const books = [
  new Book('Harry Potter', 'JK Rowling'),
  new Book('Lord of the Rings', 'JRR Tolkien')
]

const typeDefs = `
  type Query { 
    books: [Book] 
  }

  type Book { 
    title: String, author: String 
  }
`

const rootValue = {
  Query: { books: () => books },
}

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: rootValue,
})

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(5000, () => {
  console.log('Go to http://localhost:5000/graphiql to run queries!');
})
