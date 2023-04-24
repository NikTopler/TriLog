import { PoolConnection } from 'mariadb';

type DbConn = PoolConnection | null;

export default DbConn;