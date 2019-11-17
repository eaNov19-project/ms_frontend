docker-clean:
	- docker rmi islamahmad/eaproj-ms-frontend
docker-build:
	docker build -t islamahmad/eaproj-ms-frontend .
docker-run:
	docker run -d -p 80:80 --name finalproj islamahmad/eaproj-ms-frontend