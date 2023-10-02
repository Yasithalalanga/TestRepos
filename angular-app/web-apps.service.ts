import * as fs from 'fs';

function getDockerfileContext() {
  const DockerfileContent = `
        FROM node:18-alpine as builder
        RUN npm install -g pnpm
        WORKDIR /app
        COPY . .
        RUN if [ -f "./package-lock.json" ]; then npm install; \
            elif [ -f "./yarn.lock" ]; then yarn; \
            elif [ -f "./pnpm-lock.yaml" ]; then pnpm install;fi
        COPY . .
        RUN npm run build
        FROM nginxinc/nginx-unprivileged:stable-alpine-slim

        # Update nginx user/group in alpine
        ENV ENABLE_PERMISSIONS=TRUE
        ENV DEBUG_PERMISSIONS=TRUE
        ENV USER_NGINX=10015
        ENV GROUP_NGINX=10015
        
        RUN echo '$(getCustomErrorPageContent())' > /usr/share/nginx/html/error_404.html
        RUN echo '$(getNginxConfig())' > /usr/share/nginx/conf.d/default.conf


        COPY --from=builder /app/dist/angular-app/ /usr/share/nginx/html/
        USER 10015
        EXPOSE 8080
        CMD ["nginx", "-g", "daemon off;"]
        `;
  return DockerfileContent;
}

function getCustomErrorPageContent() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Error</title>
  </head>
  <body>
    <p>404 Error</p>
  </body>
  </html>
  `;
}

function getNginxConfig() {
  return `
  server {                                                                                                                                                                                                              
    listen       8080;                                                                                                                                                                                                
    server_name  localhost;                                                                                                                                                                                           
                                                                                                                                                                                                                      
    #access_log  /var/log/nginx/host.access.log  main;                                                                                                                                                                
                                                                                                                                                                                                                      
    location / {                                                                                                                                                                                                      
        root   /usr/share/nginx/html;                                                                                                                                                                                 
        index  index.html index.htm;                                                                                                                                                                                  
    }                                                                                                                                                                                                                 
                                                                                                                                                                                                                      
    error_page  404              /error_404.html;  
    location = /error_404.html {                                                                                                                                                                                            
        root   /usr/share/nginx/html;                                                                                                                                                                                 
    }                                                                                                                                                                           
                                                                                                                                                                                                                      
    # redirect server error pages to the static page /50x.html                                                                                                                                                        
    #                                                                                                                                                                                                                 
    error_page   500 502 503 504  /50x.html;                                                                                                                                                                          
    location = /50x.html {                                                                                                                                                                                            
        root   /usr/share/nginx/html;                                                                                                                                                                                 
    }                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  `;
}

const dockerfileContent: string = getDockerfileContext();
fs.writeFileSync('Dockerfile', dockerfileContent, 'utf-8');

