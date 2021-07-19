all: run

run:
	cd backend && docker-compose up -d && cd .. && npm start

kill:
	fuser -k 3010/tcp && fuser -k 3000/tcp && cd backend && docker-compose down && cd ..

install:
	npm install && cd frontend && npm install && cd ../backend && npm install && cd ..

clean:
	rm -rf node_modules backend/node_modules frontend/node_modules package-lock.json frontend/package-lock.json backend/package-lock.json


