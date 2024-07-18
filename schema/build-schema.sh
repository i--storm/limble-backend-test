#/bin/bash

MYSQL_PWD="${DATABASE_PASSWORD}" mariadb -u "${DATABASE_USER}" -h "${DATABASE_HOST}" "${DATABASE_NAME}" < /code/schema.sql
MYSQL_PWD="${DATABASE_PASSWORD}" mariadb -u "${DATABASE_USER}" -h "${DATABASE_HOST}" "${DATABASE_NAME}" < /code/migration-1.sql
MYSQL_PWD="${DATABASE_PASSWORD}" mariadb -u "${DATABASE_USER}" -h "${DATABASE_HOST}" "${DATABASE_NAME}" < /code/fixture-1.sql

