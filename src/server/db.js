const mongoose = require('mongoose')

const state = {
  db: null,
};

exports.connect = async (url) => {
  try {
    if (state.db) {
      return;
    }
    mongoose.connect(url, { useNewUrlParser: true })
    state.db = mongoose.connection
    state.db.on('error', (error) => console.error(error))
    state.db.once('open', () => console.log('Connected to Database'))
  } catch (err) {
    console.error(err);
  }
};
exports.get = () => {
  return state.db;
};
