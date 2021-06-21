import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../Components/Header2';
import NewRecipe from '../Components/recipe/newRecipe';
/* import UserProfile from '../Components/profile/'; */

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div>
      <Header />
      <div className="h3 mx-4 max-w-screen-lg">
       {username}
      </div>
      <div className='newrec'> 
        <NewRecipe />
      </div>
    </div>
  ) : null;
}