import 'dotenv/config';
import jwt from 'jsonwebtoken';
import SkyUserRepository from '../repository';

const skyUserRepository = new SkyUserRepository();

export default class SingInController {
  async singIn(req, res) {
    try {
      const { email, senha } = req.body;
      const message = 'Usuário e/ou senha inválidos.';

      const dbUser = await skyUserRepository.findUserByEmail(email);

      if (!dbUser) {
        return res.status(404).json({ message });
      }

      const senhaDecodificada = jwt.decode(dbUser.senha, process.env.SECRET);

      if (senhaDecodificada !== senha) {
        return res.status(401).json({ message });
      }

      await skyUserRepository.updateLogin(dbUser);

      return res.status(200).json(dbUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}
