import loadable from '@util/loadable'
const Home = loadable(() => import('@pages/home'))
const Index = loadable(() => import('@pages/Index/index.jsx'))
const Collecte = loadable(() => import('@pages/Collect'))
const Detail = loadable(() => import('@pages/detail'))
const NotFound404 = loadable(() => import('@pages/404'))
const Login = loadable(() => import('@pages/login'))

const routes = [
    {
        path: '/Index',
        component: Index
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/Collecte',
        component: Collecte
    },
    {
        path: '/Detail',
        component: Detail
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/NotFound',
        component: NotFound404
    }
];

export default routes
