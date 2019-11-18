docker-clean:
	- docker rmi islamahmad/eaproj-ms-frontend
docker-build:
	docker build -t islamahmad/eaproj-ms-frontend:1.0.3 .
docker-push:
	docker push islamahmad/eaproj-ms-frontend:1.0.3
kube-config:
	kubectl apply -f k8s-config.yaml
kube-deploy:
	kubectl apply -f k8s-deploy.yaml
docker-run:
	docker run -d -p 80:80 --name finalproj islamahmad/eaproj-ms-frontend