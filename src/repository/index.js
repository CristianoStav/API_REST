import SkyUser from '../models/user';

export default class SkyUserRepository {
  async createUser(user) {
    return SkyUser.create(user);
  }

  async findUserByEmail(email) {
    return SkyUser.findOne({ email });
  }

  async findUserById(_id) {
    return SkyUser.findOne({ _id });
  }

  async updateLogin({ _id }) {
    return SkyUser.updateOne({ _id }, { ultimo_login: new Date() });
  }
}
