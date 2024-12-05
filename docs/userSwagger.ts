/**
 * @swagger
 * /api/profile/:
 *   get:
 *     summary: Get user profile information
 *     description: Fetches the profile information of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile data"
 *                 userByID:
 *                   type: object
 *                   description: The profile details of the user.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 9
 *                     email:
 *                       type: string
 *                       example: "john.doe2@example.com"
 *                     name:
 *                       type: string
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
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error 🔴"
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Fetches a list of all users. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   photo:
 *                     type: string
 *                     example: "/public/images/johndoe.jpg"
 *       403:
 *         description: Forbidden access if the user is not an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Function not available for your profile"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error 🔴"
 */

/**
 * @swagger
 * /api/search-users:
 *   get:
 *     summary: Search for users by name or email
 *     description: Allows searching users by their name or email address.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *         required: true
 *         description: Search term for user name or email.
 *         schema:
 *           type: string
 *           example: "john"
 *     responses:
 *       200:
 *         description: Successfully fetched the list of users matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   photo:
 *                     type: string
 *                     example: "/public/images/johndoe.jpg"
*       403:
 *         description: Forbidden access if the user is not an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Function not available for your profile"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error 🔴"
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get specific user profile
 *     description: Fetches the profile information for a specific user based on their ID. Admins can access any profile, and regular users can only access their own profile.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user whose profile is to be fetched.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully fetched user profile information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile data"
 *                 userByID:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     photo:
 *                       type: string
 *                       example: "/public/images/johndoe.jpg"
 *       403:
 *         description: Forbidden access if the user does not have permission to view the profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Function not available for your profile"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error 🔴"
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Updates the profile information of a user. Requires the user to be authenticated and have permission to edit their profile.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user whose profile is to be updated.
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
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successfully updated user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User updated successfully"
 *       403:
 *         description: Forbidden access if the user does not have permission to update the profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Function not available for your profile"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error 🔴"
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user account
 *     description: Deletes a user account. Only admins or the user themselves can delete the account.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted user account.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User deleted"
 *       403:
 *         description: Forbidden access if the user cannot delete the profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You can't delete your own account!"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error 🔴"
 */
