####################################################################################
# How to :
# Build : docker build -t pfalfa-dashboard-exp .
# Run : docker run --name pfalfa-dashboard-exp -d -p 3000:3000 pfalfa-dashboard-exp
####################################################################################

FROM node:10

WORKDIR /usr/src/app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]
