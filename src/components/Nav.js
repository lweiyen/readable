import React from 'react';
import { NavLink } from 'react-router-dom';
import SortInput from './SortInput';

const Nav = (props) => (
  <nav className='nav'>
    <ul>
      <li>
          Category:
      </li>
      <li>
        <NavLink to='/' exact activeClassName='active'>
          All
        </NavLink>
      </li>
      {Object.values(props.categories).map(({name, path}) => (
        <li key={name}>
          <NavLink to={`/${path}`} exact activeClassName='active'>
            {name}
          </NavLink>
        </li>))}
      <li className='sort'>
        <span> Sort By: </span>
        <SortInput />
      </li>
    </ul>
  </nav>
);

export default Nav;