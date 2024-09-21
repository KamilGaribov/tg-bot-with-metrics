const userController = (req, res) => {
    console.log("hello from user controller")
    const users = [
        {
            name: "Kamil",
            age: 29
        },
        {
            name: "Aydin",
            age: 27
        }]
    return res.status(200).json({ "data": users })
}

export default userController