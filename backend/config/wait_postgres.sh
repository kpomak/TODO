#!/bin/sh
# await_postgres.sh

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD="kpomak" psql -h "$host" -d "todo" -U "kpomak" -c '\q';
do
  >&2 echo "Postgres is unavaliable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd