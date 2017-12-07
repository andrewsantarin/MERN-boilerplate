const fs = require('fs');
const path = require('path');

// How to retrieve folders only:
// https://stackoverflow.com/a/24594123/1933636

/**
 * Determines whether the given buffer is a directory.
 *
 * @param {string|Buffer|URL} source - the buffer to scan for.
 * @returns {Boolean} whether the buffer is a directory (true) or not (false).
 */
const isDirectory = (sourcePath) => fs.lstatSync(sourcePath).isDirectory();


/**
 * Generates a endpoint route file path string from the domain directory provided.
 *
 * @param {string} domain folder - the folder of the domain containing an endpoint file.
 * @param {string} endpoints file - the file containing all domain-specific routes.
 *
 * @returns {string} the path to the endpoint file.
 */
const mapDomainToEndpoints = (domainFolder, endpointsFile) => `./${domainFolder}${endpointsFile}`;


/**
 * Creates path references to the endpoint route files.
 *
 * @param {string|Buffer|URL} source - the buffer to scan for.
 * @param {string} endpoint file path - the path to the endpoint route file.
 */
const createRoutes = (sourcePathName, endpointsFilePathName) =>
  // 1. Read the top-level folder with the source path name.
  // 2. Obtain subfolders only, e.g. /user, /order, /cart. Files, e.g. 'api.js', will be ignored.
  // 3. Create endpoint refs, e.g. ./user/urls, ./order/urls/, ./cart/urls/.
  fs.readdirSync(sourcePathName)
    .filter(pathName => isDirectory(path.join(sourcePathName, pathName)))
    .map(domainPathName => mapDomainToEndpoints(domainPathName, endpointsFilePathName));


const ENDPOINTS_FILE_PATH_NAME = '/urls'; // Default endpoint file path.
const configureRoutes = (app) => {
  const routes = createRoutes(__dirname, '/urls');
  routes.forEach(route => {
    // Creates endpoint modules, e.g. require('./user/urls'), require('./order/urls'), require('./cart/urls').
    require(route)(app);
  });
}

module.exports = configureRoutes;
