import User from "../Model/user.js"

class UserController {
    static async postToDo(req, res){
        try{
            const {nome, email, telefone, nascimento} = req.body

            const user = await User.create({
                nome,
                email,
                telefone,
                nascimento
            })
            return res.status(201).json(user);
        }catch(err){
            return res.status(500).json({
                message: "Erro ao criar usuário",
                error: err.message
            })
        }
    }

    static async getRegisters(req, res){
            try{
                const users = await User.findAll();

                res.status(200).json(users)
            }catch(error){
                res.status(500).json({
                    message: "Erro ao buscar dados",
                    error: error.message
                })
            }
        }
    static async putRegisters(req, res){
        try{
            const {nome, email, telefone, nascimento} = req.body
            const {id} = req.params
            const user = await User.findByPk(id)

        await user.update({nome, email, telefone, nascimento})
        return res.status(200).json({message: "Tudo certo"})
    } catch(err){
        return res.status(500).json({message: "Erro ao atualizar usuario!", error: err.message})
    }}
    static async deletRegister(req, res){
        try{
        const {id} = req.params

        const user = await User.findByPk(id)
        await user.destroy()
        res.status(200).json({message: "Usuario deletado com sucesso!"})
        } catch(error){
            res.status(500).json({message: "Falha em deletar usuario", error: error.message})
        }
    }
}

export default UserController