# Your contacts

Simple API to create contacts lists [https://alexgt9-contacts.herokuapp.com](https://alexgt9-contacts.herokuapp.com).

Each `:username` is a unique contacts list

## Endpoints

### Get contacts

`GET /users/:username/contacts`

Response
```
[
    {
        "id": 1,
        "name": "Paco Pil",
        "phone": "666777888",
        "email": "paco.pil@example.com",
        "createdAt": "2021-12-18T19:12:47.826Z"
    },
    {
        ...
    }
]
```

### Create contact

`POST /users/:username/contacts`

```
Body
{
    "name": "Paco Pil",
    "phone": "666777888",
    "email": "paco.pil@example.com"
}
```

### Edit contact

`PATCH /users/:username/contacts/:id`

```
Body
{
    "name": "New name",
    "phone": "New phone",
    "email": "New email"
}
```

### Delete contact

`DELETE /users/:username/contacts/:id`

## Deploying to Heroku

```
$ git push heroku master
$ heroku open
```

## Working locally

```
$ heroku local
```

Api will be available at [http://localhost:5000](http://localhost:5000)
