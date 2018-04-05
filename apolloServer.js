const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const books = require('./mockData')

const typeDefs = `
  type Query { 
    genres: [Genre]
    books: [Book] 
    book(id: ID!): Book
  }

  type Genre {
    id: ID!
    name: String
  }

  type Book { 
    id: ID!
    title: String
    author: String 
    genre: Genre
  }
`

const delay = () => new Promise(res => {
  setTimeout(() => {
    res(true)
  }, 1000)
})


const rootValue = {
  Query: { 
    genres: async () => {
      await delay()
      return genres
    },

    books: async () => {
      await delay()
      return books
    },

    book: async (_, { id }, ctx, info) => {
      await delay()
      return books.find(x => x.id === parseInt(id))
    }
  },
}

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: rootValue,
})

const app = express()
app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(5000, () => {
  console.log('Go to http://localhost:5000/graphiql to run queries!');
})
