const _ = require('lodash');

const pickedInfo = ["idPerson", "Username", "First_Name", "Last_Name", "Parent_Person_ID", "Group_idGroup", "Role_idRole", "Rating_idRating"];

class Utils {
    static sanitizeUser(user) {

        user = _.pick(user, pickedInfo);
        return user;
    }
}

module.exports = Utils;