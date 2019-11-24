function Init( Schema ) {
    let Message = Schema.models.message;
    let User = Schema.models.user;

    User.hasMany(Message, { as: 'message', foreignKey: 'userId' });
    Message.belongsTo(User, { as: 'author', foreignKey: 'userId' });
}

module.exports = Init;