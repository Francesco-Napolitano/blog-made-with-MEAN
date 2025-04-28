import * as mongodb from "mongodb";

export interface User {
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
};

