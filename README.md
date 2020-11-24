## Prerequisites

- Docker
- npm

## Installation

In the root of the project run below command.
```bash
$ npm install
```
To launch project we use Docker, but without running this command Visual Studio Code will throw errors.

## Running the app
```bash
# development
$ docker-compose up
```

```bash
# debug (Visual Studio Code)
$ docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
```

After adding new npm packages, run this command to launch all containers
```bash
docker-compose up --build -V
```

## Test
For **unit tests** change `command` property in `docker-compose.test.yml` file for
```bash
command: npm run test:watch
```
And run command
```bash
# unit tests
$ docker-compose -f docker-compose.test.yml -p debt-exchange_test up
```

For **e2e tests** change `command` property in `docker-compose.test.yml` file for
```bash
command: npm run test:e2e:watch
```
And run the same command as for unit tests
```bash
# e2e tests
$ docker-compose -f docker-compose.test.yml -p debt-exchange_test up
```
