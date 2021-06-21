import { useState, useEffect } from 'react';
import { getRecipe } from '../services/firebase';
import { getRecipe, getUserByUserId } from '../services/firebase';

export default function useRecipe(){
    const [recipe, setRecipe] = useState(null);
    const {
        user: {uid: userId = '' }
    } = useContext(UserContext);

    useEffect(() => {
        async function getTimeLineRecipe(){
            const following = await getUserByUserId(userId);
            let followedUserRecipe = [];

            if (following.length > 0)
            {
                followedUserRecipe = await getRecipe(userid, following);
            }
        }

        console.log(userId);

    },[]);
    return {photos};
}