/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a specific movie or show by ID
 *     description: Retrieves detailed information about a specific movie or show by its ID from an external API.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the movie or show to fetch.
 *         schema:
 *           type: integer
 *           example: 12345
 *       - name: type
 *         in: query
 *         required: true
 *         description: The type of the media (either 'movie' or 'tv').
 *         schema:
 *           type: string
 *           enum:
 *             - movie
 *             - tv
 *           example: movie
 *     responses:
 *       200:
 *         description: The requested movie or show details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the movie or show.
 *                   example: 12345
 *                 poster_path:
 *                   type: string
 *                   description: URL to the poster image of the movie or show.
 *                   example: "/path/to/poster.jpg"
 *                 original_name:
 *                   type: string
 *                   description: The original title of the movie or show.
 *                   example: "Inception"
 *                 overview:
 *                   type: string
 *                   description: A brief description of the movie or show.
 *                   example: "A mind-bending thriller about dream manipulation."
 *                 vote_average:
 *                   type: number
 *                   format: float
 *                   description: The average rating of the movie or show.
 *                   example: 8.8
 *                 video_url:
 *                   type: string
 *                   description: The URL of the movie's or show's video (YouTube link if available).
 *                   example: "https://www.youtube.com/watch?v=xyz123"
 *                 saved:
 *                   type: boolean
 *                   description: Whether the movie or show is saved in the user's library.
 *                   example: true
 *       400:
 *         description: Invalid or missing movie/show ID or type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid 'id' or 'type' parameter"
 *       500:
 *         description: Error fetching data from the external API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching movie from external API"
 * 
 * /api/trending/movies:
 *   get:
 *     summary: Get a list of trending movies
 *     description: Fetches a list of trending movies from an external API.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of trending movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the movie.
 *                     example: 12345
 *                   poster_path:
 *                     type: string
 *                     description: URL to the poster image of the movie.
 *                     example: "/path/to/poster.jpg"
 *                   media_type:
 *                     type: string
 *                     description: The media type (movie).
 *                     example: "movie"
 *       500:
 *         description: Error fetching trending movies from the external API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching trending movies"
 * 
 * /api/trending/shows:
 *   get:
 *     summary: Get a list of trending TV shows
 *     description: Fetches a list of trending TV shows from an external API.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of trending TV shows.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the show.
 *                     example: 67890
 *                   poster_path:
 *                     type: string
 *                     description: URL to the poster image of the show.
 *                     example: "/path/to/poster.jpg"
 *                   media_type:
 *                     type: string
 *                     description: The media type (tv).
 *                     example: "tv"
 *       500:
 *         description: Error fetching trending TV shows from the external API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching trending TV shows"
 * 
 * /api/top-rated/movies:
 *   get:
 *     summary: Get a list of top-rated movies
 *     description: Fetches a list of top-rated movies from an external API.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of top-rated movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the movie.
 *                     example: 12345
 *                   poster_path:
 *                     type: string
 *                     description: URL to the poster image of the movie.
 *                     example: "/path/to/poster.jpg"
 *                   media_type:
 *                     type: string
 *                     description: The media type (movie).
 *                     example: "movie"
 *       500:
 *         description: Error fetching top-rated movies from the external API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching top-rated movies"
 * 
 * /api/top-rated/shows:
 *   get:
 *     summary: Get a list of top-rated TV shows
 *     description: Fetches a list of top-rated TV shows from an external API.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of top-rated TV shows.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the show.
 *                     example: 67890
 *                   poster_path:
 *                     type: string
 *                     description: URL to the poster image of the show.
 *                     example: "/path/to/poster.jpg"
 *                   media_type:
 *                     type: string
 *                     description: The media type (tv).
 *                     example: "tv"
 *       500:
 *         description: Error fetching top-rated TV shows from the external API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching top-rated TV shows"
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
