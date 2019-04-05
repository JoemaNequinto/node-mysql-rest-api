import bcrypt from 'bcryptjs';

export default function(sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(80),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  // eslint-disable-next-line no-shadow
  user.beforeSave(async user => {
    try {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        // eslint-disable-next-line no-param-reassign
        user.password = hash;
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  // eslint-disable-next-line func-names
  user.prototype.isValidPassword = async function(pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };

  return user;
}
