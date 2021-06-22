import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user";
import {firestore} from '../../lib/firebase'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import '../../Components/recipe/res.css';
/* import Link from '@material-ui/core/Link'; */
import HelpIcon from '@material-ui/icons/Help';


//style
const CardStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: "10px",
     /*  display: "block", */
      /* float:'left', */
    },
    media: {
       
        height: 0,
        paddingTop: '56.25%', // 16:9 
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const classes = CardStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const user = useContext(UserContext);

  useEffect(() => {
    const getRecipes = async () => {
      const recipeCol = await firestore
        .collection("Recipes")
        .get();

      setRecipes(recipeCol.docs);
    };
    getRecipes();
  }, [user]);

  const renderRecipes = () => {
      
    return recipes.map((recipe, i) => {
        
      const recipeData = recipe.data();
      return (
          <>
        <div className="ert">
        <Card className={classes.root}>
        <CardHeader
            title={recipeData.name} 
        />
        <CardMedia
            className={classes.media}
            image={recipeData.fileUrl}
        />
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
            <Link to={`/r/${recipe.id}`}>
            <HelpIcon />
            </Link>
            </IconButton>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography paragraph>
                Ingredients
                <ol>
                {recipeData.ingredients.map((ingredient, i) => 
                    (
                        <li key={i}>{ingredient}</li>
                    ) 
                )}
                </ol>
            </Typography>
            </CardContent>
        </Collapse>
        </Card>
        </div>
       {/*  <li key={i}>
          <Link to={`/r/${recipe.id}`}>{recipeData.name}</Link>
        </li> */}
        </>
      );
    });
  };

  return  (
    <div>
        
      <h1>Recipes</h1>
     
         <div className="recipe-list">
     
        {renderRecipes()}
    
        </div> 
      
    </div>
   
  );
};

export default RecipeList;