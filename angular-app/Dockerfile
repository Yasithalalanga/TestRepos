FROM nginxinc/nginx-unprivileged:stable-alpine-slim
        WORKDIR /app
        # Update nginx user/group in alpine
        ENV ENABLE_PERMISSIONS=TRUE
        ENV DEBUG_PERMISSIONS=TRUE
        ENV USER_NGINX=10015
        ENV GROUP_NGINX=10015

        COPY default.conf /etc/nginx/conf.d/default.conf
        COPY error_404.html /usr/share/nginx/html/error_404.html  
        USER root
        RUN ln -sf /app/public/ /usr/share/nginx/html/
        USER nginx
        COPY . /usr/share/nginx/html/
        USER 10015
        EXPOSE 8080
        CMD ["nginx", "-g", "daemon off;"]
