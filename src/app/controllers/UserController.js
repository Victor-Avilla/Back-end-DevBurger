/*
    store -> cria dado
    index -> lista todos os dados
    show -> mostra um dado
    update -> atualiza dados
    delete -> deleta um dado
*/
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import User from '../models/User.js';
import * as Yup from 'yup';
class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean().required(),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.errors });
    }

    const { name, email, password, admin } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Este email ja esta cadastrado, tente outro.' });
    }

    const password_hash = await bcrypt.hash(password,8);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
