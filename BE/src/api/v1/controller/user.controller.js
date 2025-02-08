import { StatusCodes } from 'http-status-codes'
import Account from '../../../model/account.model.js'
import bcrypt from 'bcrypt'

// [POST] /user/register
const register = async (req, res) => {
    try {
        const existed = await Account.findOne({
            email: req.body?.email
        });

        if (existed) {
            res.status(StatusCodes.CONFLICT).json({ messsage: "Email bị trùng!" });
            return;
        }
        
        const newAccount = {
            email: req.body?.email,
            password: await bcrypt.hash(req.body?.password, 10)
        }
        await new Account(newAccount).save()
        res.status(StatusCodes.OK).json({ messsage: "Đăng ký thành công!" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

const userController = {
    register
}

export default userController