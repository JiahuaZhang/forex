import type { MetaFunction } from "@remix-run/node";
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "Routes" },
  ];
};

export default function Index() {
  const files = import.meta.glob('./**/*.tsx');
  const routes = Object.keys(files).filter(file => !file.includes('_index.tsx'));
  const oandaRoutes = routes.filter(route => route.startsWith('./oanda')).map(route => route.replace('./oanda.', 'oanda/'));
  const otherRoutes = routes.filter(route => !oandaRoutes.includes(route));

  return (
    <ul un-list='none' un-mt='8' un-grid='~' un-gap='4' >
      {otherRoutes.map(route => (
        <li key={route}>
          <Link to={route.replace(/^\.\//, '').replace(/\.tsx$/, '')}>
            {route.replace(/^\.\//, '').replace(/\.tsx$/, '')}
          </Link>
        </li>
      ))}
      <li>
        Oanda:
        <ul un-mt='2' un-grid='~' un-gap='4'>
          {oandaRoutes.map(route => (
            <li key={route}>
              <Link to={route.replace(/\.tsx$/, '')}>
                {route.replace(/\.tsx$/, '')}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
