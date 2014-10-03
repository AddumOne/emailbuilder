'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Template Schema
 */
var TemplateSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Template name',
		trim: true
	},
    subject: {
        type: String,
        default: '',
        trim: true
    },
    greeting: {
        type: String,
        default: '',
        trim: true
    },
    message: {
        type: String,
        default: '',
        trim: true
    },
    signature: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Template', TemplateSchema);