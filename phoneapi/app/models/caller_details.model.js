module.exports = (sequelize, Sequelize) => {
  const Caller_details = sequelize.define("caller_details", {
    name: {
      type: Sequelize.STRING,
    },
    user_number: {
      type: Sequelize.STRING,
    },
    receiver_number: {
      type: Sequelize.STRING,
    },
    call_details: {
      type: Sequelize.JSON,
    },
  });

  return Caller_details;
};
