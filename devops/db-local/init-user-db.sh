#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER mapermauser WITH PASSWORD 'mapermapassword';
    CREATE DATABASE maperma;
    CREATE DATABASE mapermatest;
    GRANT ALL PRIVILEGES ON DATABASE maperma TO mapermauser;
    GRANT ALL PRIVILEGES ON DATABASE mapermatest TO mapermauser;
EOSQL
