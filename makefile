clean:
	- docker rmi islamahmad/eaproj-frontend-ms
build:
	docker build -t islamahmad/eaproj-frontend-ms:1.0.4 .
push:
	docker push islamahmad/eaproj-frontend-ms:1.0.4
config:
	kubectl apply -f k8s-config.yaml
deploy:
	kubectl apply -f k8s-deploy.yaml
run:
	docker run -d -p 80:80 --name finalproj islamahmad/eaproj-frontend-ms