const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const books = require('./mockData')

const schema = buildSchema(`
  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Book {
    id: ID!, title: String, author: String
  }
`)


const rootValue = {
  books: () => books,

  book: ({ id }) => {
    console.log('Fetching id', id)
    return books.find(x => x.id === parseInt(id))
  }
}

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))

app.listen(4000, () => console.log('Listening on 4000'))
