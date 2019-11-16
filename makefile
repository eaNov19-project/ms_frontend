docker-build:
	docker build -t natruong/ms-frontend .
docker-run:
	docker run -d -p 80:80 --name finalproj natruong/ms-frontend