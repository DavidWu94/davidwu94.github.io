FROM nginx:latest


COPY . /usr/share/nginx/html/
 
# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
 
# # Replace with our own nginx.conf
COPY nginx.conf /etc/nginx/conf.d/