import {User} from "./interfaces/types";

const listUsers: User[] = [
    {
        id: 1,
        name: "Do Van Cuong",
        address: "An Duong - Hai Phong",
        phoneNumber: "0348513665",
    },
    {
        id: 2,
        name: "Tran Minh Quang",
        address: "An Duong - Hai Phong",
        phoneNumber: "0348513122",
    },
];

class UserService {
    constructor() {
    }

    getAllUsers() {
        return listUsers;
    }

    addUser(id) {

    }
}
export default UserService;
