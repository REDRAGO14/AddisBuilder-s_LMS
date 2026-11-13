# Stage 1: Build the application using Maven
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper and build files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src src

# Grant execute permission to the Maven wrapper script and package
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:25-jdk-alpine
VOLUME /tmp
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]