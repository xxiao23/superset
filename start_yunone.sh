#!/bin/bash
PWD=`pwd`
python3.7 -m venv venv;
echo $PWD
activate () {
	    . $PWD/venv/bin/activate
    }

activate
pip install -r requirements/local.txt
pip install -e .
superset init
superset load_examples
FLASK_ENV=development superset run -p 8088 --with-threads --reload --debugger --host=0.0.0.0
#export SUPERSET_UPDATE_PERMS=0
#gunicorn -w 3 -k gevent --timeout 120 -b 0.0.0.0:8088 superset:app
