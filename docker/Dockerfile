FROM harbor.local.site.com/boilerplate/jerry-boilerplate:node-app as builder

# Bundle app source
COPY . /usr/src/app/

RUN yarn build

# Copy static asset files to build
COPY static/* build/

# change nginx to your registry
FROM nginx
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html
COPY ssl /etc/nginx/ssl
COPY nginx.conf/nginx.conf /etc/nginx/nginx.conf
RUN chmod -R 0755 /usr/share/nginx/html