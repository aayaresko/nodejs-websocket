function Init( Schema ) {
    return Schema.define('message',
        {
            id: {
                type: Schema.Number,
                index: true
            },
            content: {
                type: Schema.String
            },
            userId: {
                type: Schema.Number,
                index: true
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