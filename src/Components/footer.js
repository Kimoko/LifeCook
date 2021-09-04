import React from 'react';
import { hexToRgb, makeStyles, rgbToHex } from '@material-ui/core/styles';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';

   export default function Footer()  {
      return (
        <div>
           <div>© (copyright), 2021 |
               Email: example@gmail.com |
              <Link href='/' >num: 89044618864</Link>
              </div>
           
            </div>
      );
          } 
  