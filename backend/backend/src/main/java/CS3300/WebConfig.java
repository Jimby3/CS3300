package CS3300;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://jimby3.github.io")  // Replace with your frontend's domain
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow the necessary methods
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
