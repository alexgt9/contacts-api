const express = require('express');
const uuidv4 = require('uuid/v4');
const path = require('path');
var cors = require('cors');

const PORT = process.env.PORT || 5000

const contacts = {};
contacts['aleh'] = {};
contacts['aleh']['911d7404-f927-46b8-bde9-759be745061d'] = {id: '911d7404-f927-46b8-bde9-759be745061d', name: 'Paco Pil', phone: '777666555', email: 'paco.pil@example.com', 'createdAt': new Date() };
contacts['aleh']['911d7404-f927-46b8-bde9-759be745061b'] = {id: '911d7404-f927-46b8-bde9-759be745061b', name: 'Maria Gil', phone: '666888444', email: 'maria.gil@example.com', 'createdAt': new Date() };
contacts['aleh']['911d7404-f927-46b8-bde9-759be745061a'] = {id: '911d7404-f927-46b8-bde9-759be745061a', name: 'Jul Til', phone: '676999999', email: 'jul.til@example.com', 'createdAt': new Date() };

express()
  .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .get('/', (req, res) => {
      res.redirect('README.html');
  })
  .get('/users/:username/contacts', (req, res) => {
      const username = req.params.username;

      if (!contacts[username]) {
          contacts[username] = {};
      }
      res.json(Object.values(contacts[username]))
  })
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
  .delete('/users/:username/contacts/:id', (req, res) => {
      const username = req.params.username;
      const id = req.params.id;
      if (!contacts[username] || !contacts[username][id]) {
          res.status(404).json({ "error": 'Not found'});

          return;
      }

      delete contacts[username][id];

      res.json({});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
