import 'dotenv/config';
import jwt from 'jsonwebtoken';
import SkyUserRepository from '../repository';

const skyUserRepository = new SkyUserRepository();

export default class SingUpController {
  async singUp(req, res) {
    const user = req.body;
    const { email } = user;


    console.log('USER', user.senha);
    try {
      const dbUser = await skyUserRepository.findUserByEmail(email);

      if (dbUser) {
        return res.status(409).json({ message: 'E-mail ja existente.' });
      }

      const token = jwt.sign(user, process.env.SECRET, { expiresIn: '30 m' });
      const hash = jwt.sign(user.senha, process.env.SECRET);


      user.token = user.expiredToken ? user.expiredToken : token;
      user.ultimo_login = new Date();
      user.senha = hash;

      const persistedUser = await skyUserRepository.createUser(user);

      return res.status(200).json(persistedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}
// TODO: tentar criar middleware com joi que valide o input passado na requisição
