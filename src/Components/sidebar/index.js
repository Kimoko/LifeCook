import React, {memo} from "react";
import useUser from "../../hooks/use-user";
import User from './user';
import Suggestions from './suggestions';


export default function Sidebar(){
    const {
        user: {username, userId}
    } = useUser();
    return(
        <div className="p-4">
           Login:  <User username={username}/>
            {/* <Suggestions userId={userId}/> */}
        </div>
    );
}
/* User.whyDidYouRender = true; */