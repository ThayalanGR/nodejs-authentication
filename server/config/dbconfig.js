import mongoose from 'mongoose';

export default () => {
    mongoose.promise = global.promise;
    mongoose.connect('mongodb://localhost/nodejs_authentication', {useNewUrlParser: true});
    mongoose.connection
        .once('open', () => console.log(`mongodb connected`))
        .on('err', (err) => console.log(err) );
    mongoose.set('debug', true);
}