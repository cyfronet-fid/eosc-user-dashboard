FROM python:3.10

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

COPY Pipfile Pipfile.lock /app/

RUN pip install --upgrade pip pipenv
RUN pipenv install --deploy --system

COPY alembic.ini .
COPY app app

CMD pipenv run uvicorn --host 0.0.0.0 --port 8000 app.main:app
