const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const blogRoutes = require('./api/blogRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blog', blogRoutes);

module.exports = router;