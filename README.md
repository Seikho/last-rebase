# Days Since Last Rebase

## Installation

After cloning:

### Standard

```sh
> yarn
> yarn build
> TOKEN=yourtoken node .
> open http://localhost:3000
```

### Docker

```sh
> docker build rebase:latest .
> docker run -dt -p 3000:3000 --volume /yourconfig/folder:/code/data --env TOKEN=yourtoken --restart=always --name rebase rebase:latest
> open http://localhost:3000
```

## API

To reset the rebase counter:

```sh
> curl -X POST http://localhost:3000/rebase?token=yourtoken
> # Responses:
> # 200 OK           { "message": "Successful" }
> # 400 Unauthorized { "message": "Unauthorized" }
```

To get a HTML version of the count:

```sh
> curl http://localhost:3000
```

To get a JSON verison of the count:

```sh
> curl http://localhost:3000/rebase
> # Example response: { "date": "2018-03-02T04:46:19.974Z", "count": 1 }
```
