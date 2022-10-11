import React from "react";


const userInstance = (user) => {
    return (
            <div className="tab_line" key={user.id}>
                <div>
                    {user.first_name}
                </div>
                <div>
                    {user.last_name}
                </div>
                <div>
                    {user.email}
                </div>
            </div>
    );
};

const usersList = (users) => {
    return (      
        <div className="users_tab">
            <div className="tab_head">
                <div>
                    Имя
                </div>
                <div>
                    Фамилия
                </div>
                <div>
                    Возраст
                </div>
            </div>
            {users.map(user => {
                return userInstance(user);
                })}
        </div>       
    );
};

export default usersList;