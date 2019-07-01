const mongoose = require('../database');

const EmpSchema = new mongoose.Schema({
    _id: {
        type: Number,
        alias: 'ID',
    },

    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },

    department: {
        type: String,
        require: true,        
    }

});

EmpSchema.pre('save', async function(next) {
    var min = Math.ceil(100);
    var max = Math.floor(999);
    this._id = Math.floor(Math.random() * (max - min) + min);

    next();
});

const Emp = mongoose.model('Emp', EmpSchema);

module.exports = Emp;