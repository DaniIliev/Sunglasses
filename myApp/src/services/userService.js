export const findOneByID = async (id) => {
    const user = await fetch(`http://localhost:5200/users/${id}`)
    console.log(user.username)
    return user;
}

// export const patchUser = async (id, data) => {
//     const response = await fetch(`http://localhost:5200/users/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({data}), // Изпращаме само попълнените полета
//     });
// }