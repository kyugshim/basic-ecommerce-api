// import { ConnectionOptions } from 'typeorm';
// // import * as config from 'config';

// const config: ConnectionOptions = {
//     "type": "mysql",
//     "host": "localhost",
//     "port": 3306,
//     "username": "root",
//     "password": "1218",
//     "database": "closed_db",
//     "entities": [
//         "dist/**/*.entity{.ts,.js}"
//     ],
//     "logging": true,
//     "synchronize": true
// };

// export = config;


import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

// const dbConfig = config.get('closed_db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "1218",
    "database": "closed_db",
    "entities": [__dirname + '/../**/*.entity.{js,ts}'],
    "synchronize": true
};