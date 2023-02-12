/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // Auth
  'POST /api/v1/auth/check': 'auth/check',

  // Users
  'POST /api/v1/users/register': 'users/register',
  'POST /api/v1/users/login': 'users/login',
  'POST /api/v1/users/forgot-password': 'users/forgot-password',
  'POST /api/v1/users/reset-password': 'users/reset-password',
  'GET /api/v1/users/view': 'users/view',
  'GET /api/v1/users/view/:id': 'users/view',
  'POST /api/v1/users/update': 'users/update',
  'POST /api/v1/users/delete': 'users/delete',

  // States
  'GET /api/v1/states/view': 'states/view',
  'GET /api/v1/states/view/:id': 'states/view',

  // Projects
  'GET /api/v1/projects/view/:region_id&:id': 'projects/view',
};
