const express = require('express');
const uuidv4 = require('uuid/v4');
const path = require('path');
var cors = require('cors');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 5010


const contacts = {};
contacts['aleh'] = {};
contacts['aleh']['911d7404-f927-46b8-bde9-759be745061d'] = {id: '911d7404-f927-46b8-bde9-759be745061d', name: 'Paco Pil', phone: '777666555', email: 'paco.pil@example.com', 'createdAt': new Date() };
contacts['aleh']['911d7404-f927-46b8-bde9-759be745061b'] = {id: '911d7404-f927-46b8-bde9-759be745061b', name: 'Maria Gil', phone: '666888444', email: 'maria.gil@example.com', 'createdAt': new Date() };
contacts['aleh']['911d7404-f927-46b8-bde9-759be745061a'] = {id: '911d7404-f927-46b8-bde9-759be745061a', name: 'Jul Til', phone: '676999999', email: 'jul.til@example.com', 'createdAt': new Date() };

const app = express()
  .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .get('/', (req, res) => {
      res.redirect('/api-docs');
  })
  /**
    * @openapi
    * /users/{username}/contacts:
    *   get:
    *     tags:
    *       - Contacts
    *     description: Get contacts
    *     parameters:
    *      - $ref: '#/components/schemas/username'
    *     responses:
    *       200:
    *         description: Returns all contacts.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Contact'
    */
  .get('/users/:username/contacts', (req, res) => {
      const username = req.params.username;

      if (!contacts[username]) {
          contacts[username] = {};
      }
      res.json(Object.values(contacts[username]))
  })
  /**
    * @openapi
    * /users/{username}/contacts:
    *   post:
    *     tags:
    *       - Contacts
    *     description: Create new contact
    *     parameters:
    *      - $ref: '#/components/schemas/username'
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Contact'
    *     responses:
    *       200:
    *         description: The just created contact.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Contact'
    */
  .post('/users/:username/contacts', (req, res) => {
      const username = req.params.username;

      if (!contacts[username]) {
          contacts[username] = {};
      }

      let newContact = {
        "name": req.body.name,
        "id": uuidv4(),
        "phone": req.body.phone,
        "email": req.body.email,
        "createdAt": new Date()
      };

      contacts[username][newContact.id] = newContact;
      res.json(newContact);
  })
  /**
    * @openapi
    * /users/{username}/contacts/{id}:
    *   patch:
    *     tags:
    *       - Contacts
    *     description: Create new contact
    *     parameters:
    *      - $ref: '#/components/schemas/username'
    *      - $ref: '#/components/schemas/contactId'
    *     requestBody:
    *       required: false
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Contact'
    *     responses:
    *       200:
    *         description: The just updated contact.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Contact'
    */
  .patch('/users/:username/contacts/:id', (req, res) => {
      const username = req.params.username;
      const id = req.params.id;
      if (!contacts[username] || !contacts[username][id]) {
          res.status(404).json({ "error": 'Not found'});

          return;
      }

      const name = req.body.name || contacts[username][id].name;
      const phone = req.body.phone || contacts[username][id].phone;
      const email = req.body.email || contacts[username][id].email;

      contacts[username][id].name = name;
      contacts[username][id].phone = phone;
      contacts[username][id].email = email;

      res.json(contacts[username][id]);
  })
  /**
    * @openapi
    * /users/{username}/contacts/{id}:
    *   delete:
    *     tags:
    *       - Contacts
    *     description: Delete contact
    *     parameters:
    *      - $ref: '#/components/schemas/username'
    *      - $ref: '#/components/schemas/contactId'
    *     responses:
    *       200:
    *         description: Empty response.
    */
  .delete('/users/:username/contacts/:id', (req, res) => {
      const username = req.params.username;
      const id = req.params.id;
      if (!contacts[username] || !contacts[username][id]) {
          res.status(404).json({ "error": 'Not found'});

          return;
      }

      delete contacts[username][id];

      res.json({});
  });
  
// Swagger
const publicUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${ PORT }`;

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Simple Contacts API",
        version: "0.1.0",
        description: "This is a simple CRUD API to manage contacts",
      },
      servers: [
        {
          url: publicUrl,
        },
      ],
    },
    apis: ["./index.js", "./swagger.js"],
  };
  
const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
  
app.listen(PORT, () => {
    console.log(`Api docs on ${ publicUrl }/api-docs`);
    console.log(`Listening on ${ publicUrl }`);
});
