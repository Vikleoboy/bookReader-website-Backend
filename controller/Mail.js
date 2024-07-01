import Mail from "../models/Mail.js"

export const get = async (req, res) => {
    // get all registered mails
    const mails = await Mail.find({})

    res.json({
        message: "Successfuly found emails",
        data: {
            emails: mails
        }
    })
}

export const post = async (req, res) => {
    // get data from body
    const { username, email } = req.body

    // create new email
    const mail = new Mail({ username, email })
    await mail.save()

    // return created data
    res.json({
        message: "Successfully added email to mailing list",
        data: {
            email: mail
        }
    })
}

export const remove = async (req, res) => {
    const { email } = req.params

    // delete email
    const mail = await Mail.findOneAndDelete({ email })

    // send deleted data
    res.json({
        message: "Successfully removed email from mailing list",
        data: {
            email: mail
        }
    })
}

export const edit = async (req, res) => {
    const { email } = req.params

    // find and update
    const mail = await Mail.findOneAndUpdate({ email }, req.body, {
        returnOriginal: false
    })

    // send editied email
    res.json({
        message: "Successfully edited email",
        data: {
            email: mail
        }
    })
}

export default {
    get,
    post,
    remove,
    edit
}