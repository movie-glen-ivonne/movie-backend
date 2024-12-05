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
 *                 name:
 *                   type: string
 *                   description: The name of the library.
 *                   example: "My Favorite Movies"
 *                 creationDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the library was created.
 *                   example: "2024-12-05T10:14:56.511Z"
 *                 user:
 *                   type: object
 *                   description: The user who created the library.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                       example: 9
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *                       example: "john.doe2@example.com"
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: "John Doe"
 *                     password:
 *                       type: string
 *                       description: The hashed password of the user (usually not returned in practice).
 *                       example: "$2a$10$sIy3PVxbyOuzfpL8O4R8luCWCghSNBWmhC2dAW4j8X9eBE8xNg7EG"
 *                     photo:
 *                       type: string
 *                       description: The URL of the user's profile photo.
 *                       example: "https://i.pravatar.cc/300"
 *                     isAdmin:
 *                       type: boolean
 *                       description: Indicates whether the user has admin privileges.
 *                       example: false
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
 *                     example: 20
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
 *                           example: 19
 *                         movie:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The movie's internal ID.
 *                               example: 4
 *                             externalId:
 *                               type: integer
 *                               description: The external ID of the movie (from the external API).
 *                               example: 1241982
 *                             overview:
 *                               type: string
 *                               description: A brief description of the movie.
 *                               example: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced."
 *                             original_name:
 *                               type: string
 *                               description: The original name of the movie.
 *                               example: "Moana 2"
 *                             poster_path:
 *                               type: string
 *                               description: URL to the movie's poster image.
 *                               example: "/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg"
 *                             first_air_date:
 *                               type: string
 *                               format: date-time
 *                               description: The release date of the movie or show.
 *                               example: "2024-11-27T00:00:00.000Z"
 *                             vote_average:
 *                               type: number
 *                               format: float
 *                               description: The average rating of the movie.
 *                               example: 7
 *                             video_url:
 *                               type: string
 *                               description: URL to the movie's video (e.g., a YouTube link).
 *                               example: "https://www.youtube.com/watch?v=onzzmEg5o2I"
 *                             media_type:
 *                               type: string
 *                               description: The type of media (either 'movie' or 'tv').
 *                               example: "movie"
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the library.
 *                     example: 20
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
 *                           example: 19
 *                         movie:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The movie's internal ID.
 *                               example: 4
 *                             externalId:
 *                               type: integer
 *                               description: The external ID of the movie (from the external API).
 *                               example: 1241982
 *                             overview:
 *                               type: string
 *                               description: A brief description of the movie.
 *                               example: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced."
 *                             original_name:
 *                               type: string
 *                               description: The original name of the movie.
 *                               example: "Moana 2"
 *                             poster_path:
 *                               type: string
 *                               description: URL to the movie's poster image.
 *                               example: "/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg"
 *                             first_air_date:
 *                               type: string
 *                               format: date-time
 *                               description: The release date of the movie or show.
 *                               example: "2024-11-27T00:00:00.000Z"
 *                             vote_average:
 *                               type: number
 *                               format: float
 *                               description: The average rating of the movie.
 *                               example: 7
 *                             video_url:
 *                               type: string
 *                               description: URL to the movie's video (e.g., a YouTube link).
 *                               example: "https://www.youtube.com/watch?v=onzzmEg5o2I"
 *                             media_type:
 *                               type: string
 *                               description: The type of media (either 'movie' or 'tv').
 *                               example: "movie"
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
