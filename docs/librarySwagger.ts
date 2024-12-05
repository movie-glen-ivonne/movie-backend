/**
 * @swagger
 * /api/libraries:
 *   post:
 *     summary: Create a new library
 *     description: Creates a new library for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the library.
 *                 example: "My Favorite Movies"
 *     responses:
 *       201:
 *         description: Library created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created library.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the library.
 *                   example: "My Favorite Movies"
 *       400:
 *         description: Invalid input or missing library name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library name is required."
 *       409:
 *         description: Library with this name already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create library"
 * 
 *   get:
 *     summary: Get all libraries for the authenticated user
 *     description: Fetches all libraries for the authenticated user along with their movies.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of libraries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the library.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the library.
 *                     example: "My Favorite Movies"
 *                   movies:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the movie.
 *                           example: 1
 *                         original_name:
 *                           type: string
 *                           description: The name of the movie.
 *                           example: "Inception"
 *       204:
 *         description: No libraries found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No libraries found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error 🔴"
 * 
 * /api/libraries/{id}:
 *   get:
 *     summary: Get a specific library by ID
 *     description: Retrieves details of a specific library including its movies.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the library to fetch.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The requested library with movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the library.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the library.
 *                   example: "My Favorite Movies"
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the movie.
 *                         example: 1
 *                       original_name:
 *                         type: string
 *                         description: The name of the movie.
 *                         example: "Inception"
 *       204:
 *         description: No library found for the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No libraries found"
 *       400:
 *         description: Invalid or missing library ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing or invalid 'id' parameter"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error 🔴"
 * 
 *   put:
 *     summary: Update a library's name
 *     description: Updates the name of a specific library.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the library to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the library.
 *                 example: "Updated Library Name"
 *     responses:
 *       200:
 *         description: Library updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library updated successfully"
 *       400:
 *         description: Missing or invalid library name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library name is required."
 *       404:
 *         description: Library not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library not found"
 *       409:
 *         description: Library name already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library with this name already exists."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update library"
 * 
 *   delete:
 *     summary: Delete a library
 *     description: Deletes a library by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the library to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Library deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library deleted successfully"
 *       404:
 *         description: Library not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Library not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete library"
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
