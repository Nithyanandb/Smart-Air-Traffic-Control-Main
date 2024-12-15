
FROM openjdk:22-jdk-slim


WORKDIR /app


COPY target/ATS.jar ATS.jar


EXPOSE 1111


ENTRYPOINT ["java", "-jar", "/app/ATS.jar"]
