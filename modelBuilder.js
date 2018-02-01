const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose');

class ModelBuilder {
  /*
  * db : default db
  */
  static build ({name = '', db = 'test', attributes = {}, statics = {}, methods = {}, index = {}, dbcon = {} }) {
    const schema = new mongoose.Schema(attributes);

    schema.set('timestamps', true); // createAt, updatedAt -> UTC
    schema.set('minimize', false); // Mongoose will, by default, "minimize" schemas by removing
    // empty objects.
    schema.set('collection', name);
    schema.set('strict', false);
    schema.set('id', true);
    schema.set('toObject', {getters: true, virtuals: true, minimize: false, id: true});
    schema.set('toJSON', {getters: true, virtuals: true, minimize: false, id: true});

    schema.statics = statics;
    schema.methods = methods;
    schema.plugin(uniqueValidator);
    schema.plugin(mongoosePaginate);

    const connection = dbcon;
    const model = connection.model(name, schema);
    model.ObjectId = mongoose.Types.ObjectId;

    return model;
  }
}

module.exports = ModelBuilder;
