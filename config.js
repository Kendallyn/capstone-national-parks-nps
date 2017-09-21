exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://admin:password@ds155192.mlab.com:55192/national-parks-final-capstone' :
        'mongodb://admin:password@ds155192.mlab.com:55192/national-parks-final-capstone');
exports.PORT = process.env.PORT || 8888;
