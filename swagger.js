import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

/**
 * @openapi
 * components:
 *   schemas:
 *     username:
 *       name: username
 *       type: string
 *       required: true
 *       description: The user ID. Each username contains an unique contact list.
 *       in: path
 *     contactId:
 *       name: id
 *       type: string
 *       required: true
 *       description: The contact ID
 *       in: path
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         name:
 *           type: string
 *           description: The name of your contact
 *         phone:
 *           type: string
 *           description: The contact phone
 *         email:
 *           type: string
 *           description: The contact email
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the contact was added
 *       example:
 *         id: 911d7404-f927-46b8-bde9-759be745061d
 *         name: Paco Pil
 *         phone: "666777888"
 *         email: paco.pil@example.com
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple Contacts API",
            version: "0.1.0",
            description: "This is a simple CRUD API to manage contacts.  The user 'aleh' contains some examples. The information stored in this API is not persistent. It will be deleted from time to time.",
        },
    },
    apis: ["./app.js", "./swagger.js"],
};

export function swaggerMiddleware(app) {
    const specs = swaggerJsdoc(options);

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { 
          customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.2/swagger-ui.css',
        } )
    );
}