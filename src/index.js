import express              from 'express'
import path                 from 'path'
import chalk                from 'chalk'
import bodyParser           from 'body-parser'
import { graphqlExpress,
  graphiqlExpress }         from 'apollo-server-express'

import {
  mongodbConnector as connector
}                           from './connectors'
import config               from './config'
import schema               from './graphql/schema'

const start = async () => {
  const log = console.log

  log(chalk.blue('\nStarting mongodb...'))
  const mongo = await connector(config.MONGO_URL)

  const app = express()
  app.use('/', express.static(path.resolve(__dirname, '/../public')))

  app.get('/', (req, res) => {
    res.send({
      message: 'I am a server route and can also be hot reloaded!'
    })
  })

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { mongo },
    schema
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))

  app.listen(config.PORT, () => {
    log('\n')
    log(chalk.bgGreen.black(`Server listening on http://localhost:${config.PORT}/ ..`))
    log('\n')

    log(`${chalk.blue('/graphql')}  - endpoint for queries`)
    log(`${chalk.blue('/graphiql')} - endpoint for testing`)
    log('\n')
  })
}

start()
