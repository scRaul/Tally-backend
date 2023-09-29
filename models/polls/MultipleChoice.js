import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
    label: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length <= 280;
            },
            message: props => `Choice uses (${props.value.length}) characters. Maximum allowed: 280.`
        },
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

const settingsSchema = new mongoose.Schema({
    require_names: {
        type: Boolean,
        default: false
    },
    multiple_options: {
        type: Boolean,
        default: false
    },
    security: {
        type: String,
        enum: ['ip', 'uid'],
        default: 'ip'
    }
})

export default new mongoose.Schema({
    question: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length <= 150;
            },
            message: props => `Question uses ${props.value.length} characters. Maximum allowed: 150.`
        },
        required: true
    },
    choices: {
        type: [choiceSchema],
        validate: {
            validator: function(value) {
                return value.length > 1 && value.length <= 30;
            },
            message: props => `Poll has ${props.value.length} choices. Minimum allowed: 2 ; Maximum allowed: 30.`
        },
        required: true
    },
    settings: {
        type: settingsSchema,
        default: new settingsSchema()
    },
    admin: {
        type: mongoose.Schema.Types,
        validate: {
            validator: function(value) {
                if (typeof value !== 'string' || !mongoose.Schema.Types.ObjectId.isValid(value)) {
                    throw new Error(`${typeof value} is not a valid data type for admin.`)
                }
            }
        },
        required: true
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId, String],
        default: []
    }
}, { timestamps: true });
