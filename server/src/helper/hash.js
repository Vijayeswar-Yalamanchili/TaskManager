import bcrypt from 'bcryptjs'

const SALT = 10

const createHash = async(data) => {
    const salt = await bcrypt.genSalt(SALT)
    const hash = await bcrypt.hash(data,salt)
    return hash
}

const hashCompare = async(data,hash) => {
    return await bcrypt.compare(data,hash)
}

export default {
    createHash,
    hashCompare
}