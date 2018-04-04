const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const Book = require('./book')

const schema = buildSchema(`
  type Query {
    books: [Book]
  }

  type Book {
    title: String
    author: String
  }
`)


const books = [
  new Book('Harry Potter', 'JK Rowling'),
  new Book('Lord of the Rings', 'JRR Tolkien')
]

const rootValue = {
  books: () => books
}

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))

app.listen(4000, () => console.log('Listening on 4000'))
