function Init( Schema ) {
    return Schema.define('user',
        {
            id: {
                type: Schema.Number,
                index: true
            },
            nickname: {
                type: Schema.String,
                unique: true,
                index: true
            },
            firstName: {
                type: Schema.String
            },
            lastName: {
                type: Schema.String
            },
            email: {
                type: Schema.String,
                unique: true,
                index: true
            },
            password: {
                type: Schema.String
            },
            birthday: {
                type: Schema.Date
            },
            createdAt: {
                type: Schema.Date,
                default: Date.now()
            }
        },
        {
            primaryKeys: ['id']
        }
    );
}

module.exports = Init;