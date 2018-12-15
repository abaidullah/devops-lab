# Answers

Lastname: Ullah
Firstname: Abaid

## 2.2
command:sudo docker run abaidullah

## 2.3
question:Restart container beeing careful to open needed port to get access to your service (see docker help)
There is the way from Docker, where we use “-P” (upper case “P”)to auto mapping to host from container. In that case, why can’t have option for auto EXPOSE.
And there is option to expose port while starting the container. also…
command:docker run -i --expose=22 b5593e60c33b abaidullah

## 2.5
question:In order to share your new image with the world, you will push your image to official public registry called Docker Hub (or Docker Store).
command:
docker tag local-image:tagname new-repo:tagname
docker push new-repo:tagname

## 2.6
command:docker system prune -a
docker images -a
sudo docker pull abaidullah/devops_lab
sudo docker create abaidullah/devops_lab
question:
command: sudo docker run abaidullah

command:

## 2.7
question:how can you tell that container is started ?
question:What is the name of your container ?
command:sudo docker ps -a

command:sudo docker start -d --name abaidullah abaidullah/devops_lab

## 2.8
question:What is the OS from the container
output:cat /etc/*release
root@08b1dc904521:/# cat /etc/*release PRETTY_NAME="Debian GNU/Linux 9 (stretch)" NAME="Debian GNU/Linux" VERSION_ID="9" VERSION="9 (stretch)" ID=debian HOME_URL="https://www.debian.org/" SUPPORT_URL="https://www.debian.org/support" BUG_REPORT_URL="https://bugs.debian.org/"

## 3.1
command:sudo docker-compose up

## 3.4
command:sudo docker-compose up -d 
command:sudo docker-compose logs
command:
