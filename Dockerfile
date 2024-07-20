FROM electronuserland/builder:wine as builder
RUN apt-get update
WORKDIR /app
COPY . .
RUN yarn install --ignore-engines
RUN yarn run electron:build --win --x64

FROM scratch
COPY --from=builder /app/dist_electron /app
