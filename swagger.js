/**
 * @openapi
 * components:
 *   schemas:
 *     username:
 *       name: username
 *       type: string
 *       required: true
 *       description: The user ID
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