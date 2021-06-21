import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import "./css.css"

export default function User  ({username}) {

return !username? (
    <Skeleton count={1} height={61}/>
) : (
    
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 item-center">
        <div className="flex item-senter justify-between col-span-1">
           <div className="coll-span-3">
               <p className="font-bold h3">{username}</p>
               </div> 
        </div>
    </Link>
);
}




User.propTypes = {
    username: PropTypes.string
};