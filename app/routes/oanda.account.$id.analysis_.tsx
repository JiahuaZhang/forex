import { Link } from '@remix-run/react';

const links = ['instrument'];

const Analysis = () => {
  return <ul un-list='none' un-grid='~' un-gap='4'>
    {
      links.map(link => (
        <li key={link}>
          <Link to={`./${link}`}>
            {link}
          </Link>
        </li>
      ))
    }
  </ul>;
};

export default Analysis;