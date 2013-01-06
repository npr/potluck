if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// example:
// /images/hashcode/thumb/preset.jpeg

var options = {}
  , ttl
  , tmpDir
  , presets
  , decodeFn
  , regexp  = '';

var mkdirp    = require('mkdirp')
  , request   = require('superagent')
  , path      = require('path')
  , crypto    = require('crypto');


exports = module.exports = function thumbs(opts) {

  opts = opts || {};
  parseOptions (opts);

  return function static(req, res, next) {

    if ('GET' != req.method && 'HEAD' != req.method) return next();

    var thumbRequestParts = req.originalUrl.match(regexp);
    if (!thumbRequestParts) return next();

    var encodedImageURL = thumbRequestParts[1];
    decodedImageURL = decodeFn(encodedImageURL);
    var imagePreset = thumbRequestParts[2];

    if (!presets[imagePreset]) { //non-existent preset requested.
      res.writeHead(400);
      res.end('Invalid Preset')
      return;
    }

    //-- Start creating and serving a thumbnail
    var targetDir = tmpDir + '/' + imagePreset;
    mkdirp.sync(targetDir); // Make sure tmp directory exists.

    shasum = crypto.createHash('sha1');
    shasum.update(decodedImageURL);
    var ext = path.extname(decodedImageURL);

    console.dir(path.extname(url));
    var hashedName = shasum.digest('hex'); // This is to be safe, in case somebody uses risky encodeFn

    var filepath = targetDir + '/' + hashName + ext;

    request.get(url).pipe(fs.createWriteStream(filepath));
    console.log("I love thumbnails");
    //console.log(req);
    return next();

/**
    var path = parse(req).pathname;
    var pause = utils.pause(req);

    function resume() {
      next();
      pause.resume();
    }

    function directory() {
      if (!redirect) return resume();
      var pathname = url.parse(req.originalUrl).pathname;
      res.statusCode = 301;
      res.setHeader('Location', pathname + '/');
      res.end('Redirecting to ' + utils.escape(pathname) + '/');
    }

    function error(err) {
      if (404 == err.status) return resume();
      next(err);
    }

    send(req, path)
      .maxage(options.maxAge || 0)
      .root(root)
      .hidden(options.hidden)
      .on('error', error)
      .on('directory', directory)
      .pipe(res);
**/

  };

};

exports.encodeURL = function(uri) {
  return new Buffer(url).toString('base64');
}

exports.decodeURL = function(encoded) {
  return new Buffer(encoded, 'base64').toString('ascii');
}

var parseOptions = function (options) {

  ttl = options.ttl || 3600 * 24; // cache for 1 day by default.
  decodeFn = options.decodeFn || exports.decodeURL;
  presets  = options.presets || defaultPresets();

  tmpDir   = options.tmpDir || '/tmp/nodethumbnails';

  var rootPath = options.rootPath || '/images';
  if (rootPath[0] === '/') { rootPath = rootPath.substring(1); } // be forgiving to user errors!

  var allowedExtensions = options.allowedExtensions || ['gif', 'jpg', 'jpeg'];
  for (i=0; i < allowedExtensions.length; i++) {
    // be forgiving to user errors!
    if (allowedExtensions[i][0] === '.') { allowedExtensions[i] = allowedExtensions[i].substring(1); }
  }
  var szExtensions = allowedExtensions.join('|')

  // Example: http://example.com/images/AB23DC16Hash/thumbs/small.jpg
  regexp = new RegExp('^\/' + rootPath.replace(/\//ig, '\\/') +
           '\/([%\.\-A-Za-z0-9_=\+]+)\/thumbs\/([A-Za-z0-9_]+)\.(?:' + szExtensions + ')$', 'i');
}

var defaultPresets = function() {

  return {
    small: {
      width: 120
    , compression:.5
    }
  , medium: {
      width: 300
    , compression:.7
    }
  , large: {
      width: 900
    , compression:.85
    }
  }

}