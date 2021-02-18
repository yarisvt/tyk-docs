FROM 		alpine:latest

MAINTAINER  Zaid Albirawi

WORKDIR		/src

RUN			apk add hugo
RUN			apk add git

ENTRYPOINT ["hugo", "server", "--bind=0.0.0.0", "--theme=tykio", "--buildDrafts"]