import jwt from 'jsonwebtoken';
import SkyUserRepository from '../repository';

const skyUserRepository = new SkyUserRepository();

export default class UserController {
  async getUSer(req, res) {
    const message = 'Não autorizado.';

    try {
      const token = req.headers.authorization;
      const { _id } = req.params;

      if (!token) {
        return res.status(401).json({ message });
      }

      const dbUser = await skyUserRepository.findUserById(_id);

      if (dbUser.token !== token) {
        return res.status(401).json({ message });
      }

      jwt.verify(token, process.env.SECRET);

      return res.json(dbUser);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Sessão inválida' });
      }
      return res.status(500).json({ error: err.message });
    }
  }
}
