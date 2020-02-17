FROM nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf

COPY www/ /usr/share/nginx/html

RUN mkdir -p /var/log/app_engine

RUN mkdir -p /usr/share/nginx/www/_ah && \
    echo "healthy" > /usr/share/nginx/www/_ah/health

COPY conf/.htpasswd /etc/nginx/

RUN chmod -R a+r /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
