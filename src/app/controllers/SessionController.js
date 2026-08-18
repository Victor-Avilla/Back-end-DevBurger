import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
class SessionControler {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
    const isValid = await schema.isValid(req.body, { strict: true });

    const incorrectCredentials = ()=>{
        return res.status(400).json({ error: 'E-mail ou senha incorretos' });
    }
    if (!isValid) {
      incorrectCredentials();
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      incorrectCredentials();
    }
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password_hash,
    );
    if (!isPasswordCorrect) {
      incorrectCredentials();
    }
    return res.status(200).json({ 
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
     });
  }
}

export default new SessionControler();
