# Your contacts

Simple API to create contacts lists.

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

## Deploying

Just push and it will be automatically deployed

## Working locally

```
$ npm run start
```