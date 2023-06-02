FROM python:3.10-slim-buster

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev

RUN python -m pip install --upgrade pip

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

COPY . .

CMD [ "python", "run.py" ]
