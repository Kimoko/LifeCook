import useUser from "../hooks/use-user";

export default function Sidebar(){
    const {
        user: {username, userId}
    } = useUser();

    console.log('username, userId',username, userId);
    return<p>i am sidebar</p>;
}